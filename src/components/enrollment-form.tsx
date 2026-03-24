'use client';

import * as React from 'react';
import { useActionState, useEffect, useRef, useState, useCallback, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnrollment, sendEnrollmentEmail } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Send, Calendar as CalendarIcon, UploadCloud, X, ArrowLeft, Download, PartyPopper, User, Phone, MapPin, GraduationCap, Users, Target, Sparkles, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Course } from '@/app/course-data';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Logo } from './logo';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

type EnrollmentFormProps = {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
};

type FormStep = 'form' | 'review' | 'success';

const EnrollmentForm = ({ isOpen, onClose, course }: EnrollmentFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [state, formAction] = useActionState(submitEnrollment, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<FormStep>('form');
  const [formData, setFormData] = useState<any | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setIsMounted(true);
    setVerificationCode(Math.random().toString(36).substring(7).toUpperCase());
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (state.message === 'Validation failed') {
      setStep('form');
      const errorKeys = Object.keys(state.errors || {}) as (keyof typeof state.errors)[];
      errorKeys.forEach(key => {
        const errorMessages = state.errors?.[key];
        if (errorMessages && errorMessages.length > 0) {
          toast({
            title: `Invalid ${key}`,
            description: errorMessages[0],
            variant: 'destructive',
          });
        }
      });
    } else if (state.message === 'Success' && state.data) {
        toast({
            title: 'Details Saved',
            description: 'Please review your information before proceeding.',
        });
        setFormData(state.data);
        setStep('review');
    } else if (state.message && state.message !== 'Success' && state.message !== 'Validation failed') {
       toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
      setStep('form');
    }
  }, [state, toast]);
  
  const handleClose = useCallback(() => {
    formRef.current?.reset();
    setStep('form');
    setFormData(null);
    setPassportPreview(null);
    onClose();
  }, [onClose]);
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };
    
   const handleDownloadPdf = async () => {
    const pdfContentElement = pdfRef.current;
    if (pdfContentElement) {
      const canvas = await html2canvas(pdfContentElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      let widthInPdf = pdfWidth - 20;
      let heightInPdf = widthInPdf / ratio;
      
      if (heightInPdf > pdfHeight - 20) {
          heightInPdf = pdfHeight - 20;
          widthInPdf = heightInPdf * ratio;
      }
      
      const xPosition = (pdfWidth - widthInPdf) / 2;
      const yPosition = 10;
      
      pdf.addImage(imgData, 'PNG', xPosition, yPosition, widthInPdf, heightInPdf);
      const studentName = formData?.name || 'student';
      pdf.save(`STEH-Enrollment-${studentName.toString().replace(/\s+/g, '-')}.pdf`);
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
       <DialogContent className="max-w-4xl max-h-[92vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary p-6 text-primary-foreground">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl">Professional Enrollment</DialogTitle>
                <DialogDescription className="text-primary-foreground/80 font-medium">
                  {course.title}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          {formData && (
            <div ref={pdfRef}>
              <PdfContent formData={formData} passportPreview={passportPreview} verificationCode={verificationCode} currentYear={currentYear} />
            </div>
          )}
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-8">
          {step === 'form' && (
              <form action={formAction} ref={formRef}>
                  <EnrollmentFormFields course={course} onCancel={handleClose} onFileSelect={setPassportPreview} />
              </form>
          )}
          
          {step === 'review' && formData && (
            <ReviewView
              formData={formData}
              passportPreview={passportPreview}
              onEdit={() => setStep('form')}
              onDownload={handleDownloadPdf}
              onComplete={() => setStep('success')}
              toast={toast}
            />
          )}

          {step === 'success' && formData && (
            <SuccessView onClose={handleClose} paymentOption={formData.paymentOption} />
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="h-12 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {pending ? 'Processing...' : 'Review Application'}
        </Button>
    )
}

const EnrollmentFormFields = ({ course, onCancel, onFileSelect }: { course: Course, onCancel: () => void, onFileSelect: (previewUrl: string | null) => void }) => {
    const [date, setDate] = useState<Date>();
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [passportPreviewUrl, setPassportPreviewUrl] = useState<string | null>(null);

     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPassportFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                onFileSelect(result);
                setPassportPreviewUrl(result);
            };
            reader.readAsDataURL(file);
        } else {
             setPassportFile(null);
             onFileSelect(null);
             setPassportPreviewUrl(null);
        }
    };
    
    const handleRemoveFile = () => {
        setPassportFile(null);
        onFileSelect(null);
        setPassportPreviewUrl(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (
        <div className="space-y-10 pb-10">
            {passportPreviewUrl && <input type="hidden" name="passport" value={passportPreviewUrl} />}
            <input type="hidden" name="course" value={course.title} />
            
            <div className="flex items-center gap-4 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold font-display">Personal Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3" /> Full Name
                </Label>
                <Input id="name" name="name" placeholder="Enter your full name" required className="h-11 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Send className="w-3 h-3" /> Email Address
                </Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className="h-11 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number
                </Label>
                <Input id="phone" name="phone" type="tel" placeholder="e.g. 08012345678" required className="h-11 rounded-lg" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="dob" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <CalendarIcon className="w-3 h-3" /> Date of Birth
                </Label>
                <input type="hidden" name="dob" value={date ? format(date, 'PPP') : ''} />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full h-11 justify-start text-left font-normal rounded-lg",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1950}
                        toYear={new Date().getFullYear() - 10}
                        />
                    </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gender Selection</Label>
                <RadioGroup name="gender" required className="flex gap-8">
                    <div className="flex items-center space-x-3 bg-secondary/30 px-4 py-3 rounded-xl border border-border/50 cursor-pointer hover:border-primary/30 transition-colors">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer font-semibold">Male</Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-secondary/30 px-4 py-3 rounded-xl border border-border/50 cursor-pointer hover:border-primary/30 transition-colors">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer font-semibold">Female</Label>
                    </div>
                </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center gap-4 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold font-display">Location & Education</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Residential Address
                </Label>
                <Input id="address" name="address" placeholder="Residential street address" required className="h-11 rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</Label>
                  <Input id="city" name="city" placeholder="e.g. Ikeja" required className="h-11 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State</Label>
                  <Input id="state" name="state" placeholder="e.g. Lagos" required className="h-11 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stateOfOrigin" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State of Origin</Label>
                  <Input id="stateOfOrigin" name="stateOfOrigin" placeholder="Your home state" required className="h-11 rounded-lg" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="education" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Highest Qualification</Label>
                    <Select name="education" required>
                        <SelectTrigger id="education" className="h-11 rounded-lg">
                            <SelectValue placeholder="Choose qualification" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High School">High School / SSCE</SelectItem>
                            <SelectItem value="Diploma">Diploma / OND / NCE</SelectItem>
                            <SelectItem value="Degree">Bachelor's Degree / HND</SelectItem>
                            <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-bold font-display">Verification & Guardian</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Passport Photograph</Label>
                <div className="relative group">
                    <Input 
                        id="passport-upload" 
                        name="passport-upload" 
                        type="file" 
                        required 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="peer hidden" 
                        accept="image/png, image/jpeg, image/webp"
                    />
                    <div 
                        className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-6 bg-secondary/10 group-hover:bg-secondary/20 group-hover:border-primary/30 transition-all cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {passportPreviewUrl ? (
                          <div className="relative w-24 h-24 mb-4">
                            <Image src={passportPreviewUrl} alt="Preview" fill className="object-cover rounded-xl shadow-md" />
                            <button 
                              type="button"
                              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center shadow-md"
                              onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                        )}
                        <p className="text-sm font-semibold text-foreground">
                          {passportFile ? 'Replace Photo' : 'Upload Passport'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                    </div>
                </div>
              </div>

              <div className="space-y-4 bg-muted/30 p-6 rounded-2xl border border-border/50">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Users className="w-3 h-3" /> Next of Kin (Emergency)
                </Label>
                <div className="space-y-4">
                  <Input id="nextOfKinName" name="nextOfKinName" placeholder="Full Name" required className="h-10 bg-background" />
                  <Input id="nextOfKinPhone" name="nextOfKinPhone" type="tel" placeholder="Phone Number" required className="h-10 bg-background" />
                  <Input id="nextOfKinRelationship" name="nextOfKinRelationship" placeholder="Relationship (e.g. Parent)" required className="h-10 bg-background" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">4</div>
              <h3 className="text-xl font-bold font-display">Specialization & Access</h3>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Training Level</Label>
                  <Select name="grade" required>
                      <SelectTrigger id="grade" className="h-11 rounded-lg">
                          <SelectValue placeholder="Choose a level" />
                      </SelectTrigger>
                      <SelectContent>
                          {course.grades.map(grade => (
                              <SelectItem key={grade.level} value={grade.level}>
                                  {grade.level} ({grade.name})
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Referral ID (Optional)</Label>
                  <Input id="referral" name="referral" placeholder="e.g. STEH-REF-123" className="h-11 rounded-lg" />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Target className="w-3 h-3" /> Pick Specializations & Skills to Focus On
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-muted/20 p-6 rounded-2xl border border-border/50">
                  {course.details.map((skill) => (
                    <div key={skill} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox id={`skill-${skill}`} name="skills" value={skill} className="mt-1" />
                      <label 
                        htmlFor={`skill-${skill}`} 
                        className="text-sm font-medium text-muted-foreground leading-tight cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Access & Payment Method
                </Label>
                <RadioGroup name="paymentOption" required className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                        <RadioGroupItem value="paynow" id="paynow" className="peer sr-only" />
                        <Label 
                            htmlFor="paynow" 
                            className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer hover:bg-secondary/50 transition-all h-full"
                        >
                            <span className="font-bold text-foreground">Pay Now</span>
                            <span className="text-[10px] text-muted-foreground leading-snug">Begin self-paced classes. Receive your portal link via email after submission.</span>
                        </Label>
                    </div>
                    <div className="relative group">
                        <RadioGroupItem value="scholarship" id="scholarship" className="peer sr-only" />
                        <Label 
                            htmlFor="scholarship" 
                            className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer hover:bg-secondary/50 transition-all h-full"
                        >
                            <span className="font-bold text-foreground">Scholarship Aid</span>
                            <span className="text-[10px] text-muted-foreground leading-snug">Application will be reviewed by admin. Approved applicants get a unique coupon code.</span>
                        </Label>
                    </div>
                </RadioGroup>
              </div>
            </div>

            <DialogFooter className="pt-10 flex items-center justify-between border-t gap-4">
               <Button type="button" variant="ghost" onClick={onCancel} className="h-12 px-6 font-semibold">Cancel</Button>
               <SubmitButton />
            </DialogFooter>
        </div>
    );
};

const SummaryContent = ({ formData, passportPreview }: { formData: any, passportPreview: string | null }) => {
    const data = formData;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center gap-4 bg-muted/30 p-6 rounded-2xl">
                 <div className="relative w-32 h-32">
                    {passportPreview ? (
                        <Image src={passportPreview} alt="Passport" fill className="rounded-2xl object-cover shadow-lg border-4 border-white" />
                    ) : (
                        <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
                            <User className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                    )}
                 </div>
                 <div className="text-center">
                    <h4 className="font-bold text-lg">{data.name}</h4>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{data.gender}</p>
                 </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                      <div className="col-span-full">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-2">Enrollment Track</Badge>
                        <p className="font-bold text-xl text-primary">{data.course}</p>
                        <p className="text-muted-foreground font-medium">{data.grade}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Selected Plan</p>
                        <p className="font-bold text-foreground capitalize">{data.paymentOption === 'paynow' ? 'Pay Now (Self-Paced)' : 'Scholarship Application'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Fees</p>
                        <p className="font-bold text-foreground">{data.price}</p>
                      </div>

                      <div className="col-span-full space-y-1 mt-2">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Key Focus Areas</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {data.selectedSkills ? data.selectedSkills.split(', ').map((skill: string) => (
                            <Badge key={skill} variant="outline" className="bg-background text-[10px] font-semibold border-primary/30">
                              {skill}
                            </Badge>
                          )) : (
                            <span className="text-muted-foreground italic text-xs">General Focus</span>
                          )}
                        </div>
                      </div>
                  </div>
              </div>
            </div>

            <div className="bg-secondary/30 p-6 rounded-2xl space-y-4 border border-border/50">
              <div className="flex items-center gap-2 text-primary">
                <Users className="w-4 h-4" />
                <h4 className="font-bold text-sm uppercase tracking-wider">Guardian / Next of Kin</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                 <div>
                    <p className="text-xs text-muted-foreground font-medium">Full Name</p>
                    <p className="font-semibold">{data.nextOfKinName}</p>
                 </div>
                 <div>
                    <p className="text-xs text-muted-foreground font-medium">Phone</p>
                    <p className="font-semibold">{data.nextOfKinPhone}</p>
                 </div>
                 <div>
                    <p className="text-xs text-muted-foreground font-medium">Relationship</p>
                    <p className="font-semibold">{data.nextOfKinRelationship}</p>
                 </div>
              </div>
            </div>
        </div>
    );
};

const PdfContent = ({ formData, passportPreview, verificationCode, currentYear }: { formData: any, passportPreview: string | null, verificationCode: string, currentYear: number }) => {
  if (!formData) return null;
  return (
    <div className="p-8 bg-white text-black font-sans w-[210mm]">
      <div className="flex flex-col items-center justify-center text-center mb-10 border-b pb-10">
        <Logo className="mb-4" />
        <h1 className="text-2xl font-bold mt-2">SFARET TECH EDU HUB</h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Official Enrollment Summary</p>
      </div>
      
      <div className="mb-10">
          <SummaryContent formData={formData} passportPreview={passportPreview} />
      </div>

      <div className="mt-12 pt-10 border-t">
        <h3 className="font-bold text-lg mb-4 text-center">Important Next Steps</h3>
        <div className="grid grid-cols-1 gap-6 text-sm">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-2 text-primary">1. Access Link</h4>
                <p className="text-gray-600 mb-2">Check your email for the official LMS portal link. You must log in to finalize your seat and complete the process.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-2 text-primary">2. Verification</h4>
                <p className="text-gray-600">If you selected Scholarship Aid, please wait for admin approval. If you are paying now, proceed to the LMS portal to make your payment.</p>
            </div>
        </div>
        
        <div className="mt-12 text-center text-xs text-gray-400">
            <p>© {currentYear} SFARET TECH EDU HUB. All rights reserved.</p>
            <p>Verification Code: {verificationCode}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewView = ({ formData, passportPreview, onEdit, onDownload, onComplete, toast }: { formData: any, passportPreview: string | null, onEdit: () => void, onDownload: () => void, onComplete: () => void, toast: (options: any) => void }) => {
    const [isProcessing, startTransition] = useTransition();
    const [hasDownloaded, setHasDownloaded] = useState(false);

    const handleFinalSubmit = () => {
        startTransition(async () => {
            if (!hasDownloaded) {
                toast({ title: 'Download Required', description: 'Please download your summary before completing enrollment.', variant: 'destructive' });
                return;
            }
            
            toast({ title: 'Completing Enrollment', description: 'Finalizing your application...' });
            await sendEnrollmentEmail(formData);
            onComplete();
        });
    };
    
    const handleDownloadClick = () => {
        onDownload();
        setHasDownloaded(true);
        toast({ title: 'Summary Downloaded', description: 'Your enrollment PDF is ready.' });
    }

    return (
      <div className="flex flex-col h-full space-y-8 py-2">
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Application Summary</h4>
            <SummaryContent formData={formData} passportPreview={passportPreview} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-muted/50 p-6 rounded-2xl border border-border/50 text-center">
             <h5 className="font-bold text-foreground mb-2">Final Step: Complete Enrollment</h5>
             <p className="text-sm text-muted-foreground mb-6">Download your summary for your records, then click complete to receive your LMS access link via email.</p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownloadClick} variant="outline" disabled={isProcessing} className="h-12 px-8 rounded-xl font-bold">
                    <Download className="mr-2 h-4 w-4" />
                    Download Summary
                </Button>
                <Button onClick={handleFinalSubmit} disabled={isProcessing || !hasDownloaded} className="h-12 px-8 rounded-xl font-bold bg-primary text-white">
                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Complete Application
                </Button>
             </div>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" onClick={onEdit} type="button" disabled={isProcessing} className="text-muted-foreground hover:text-primary font-bold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back & Edit
            </Button>
          </div>
        </div>
      </div>
    );
};

const SuccessView = ({ onClose, paymentOption }: { onClose: () => void, paymentOption: 'paynow' | 'scholarship' }) => (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mb-8 rotate-3">
            <PartyPopper className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-3xl font-display font-bold text-foreground mb-4">Application Submitted!</h3>
        
        {paymentOption === 'paynow' ? (
            <p className="text-muted-foreground mb-10 max-w-md text-lg leading-relaxed">
                Check your email! We've sent your <strong>Official LMS Portal link</strong>. Please log in there to finalize your payment and begin your self-paced classes.
            </p>
        ) : (
            <p className="text-muted-foreground mb-10 max-w-md text-lg leading-relaxed">
                Your scholarship application is now under review. We have sent a confirmation email with our LMS portal link. Once approved, you will receive your <strong>Coupon Code</strong> to start learning.
            </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
             <Button asChild className="h-12 px-10 rounded-xl font-bold bg-primary text-white shadow-xl shadow-primary/20">
                <a href="/app">Go to App Portal</a>
             </Button>
             <Button onClick={onClose} variant="outline" className="h-12 px-10 rounded-xl font-bold">
                Close
            </Button>
        </div>
    </div>
);

export default EnrollmentForm;
