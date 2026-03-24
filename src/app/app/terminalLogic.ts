export interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'error' | 'ai-hint';
}

export const processCommand = (input: string, currentTask: string): TerminalLine[] => {
  const [cmd, ...args] = input.trim().split(' ');
  const responses: TerminalLine[] = [];

  // Always show the command the user typed (unless it's empty)
  if (input.trim()) {
    responses.push({ text: `user@tech-lab:~$ ${input}`, type: 'command' });
  }

  if (!cmd) return responses;

  switch (cmd.toLowerCase()) {
    case 'help':
      responses.push({ text: 'Available tools: nmap, cat, ls, ssh, ai-check, clear', type: 'output' });
      break;

    case 'ls':
      responses.push({ text: 'secrets.txt   config.yaml   server_logs/', type: 'output' });
      break;

    case 'nmap':
      if (args.includes('192.168.1.1')) {
        responses.push({ text: 'Scanning 192.168.1.1...', type: 'output' });
        responses.push({ text: 'PORT   STATE  SERVICE\n80/tcp open   http\n22/tcp open   ssh', type: 'output' });
      } else {
        responses.push({ text: 'Error: Target IP required. Example: nmap 192.168.1.1', type: 'error' });
        responses.push({ text: 'AI Hint: Try scanning the gateway IP (192.168.1.1) to see open ports.', type: 'ai-hint' });
      }
      break;

    case 'cat':
      if (args[0] === 'secrets.txt') {
        responses.push({ text: 'FLAG{CYBER_LAB_SUCCESS_2026}', type: 'output' });
      } else {
        responses.push({ text: `cat: ${args[0] || ''}: No such file`, type: 'error' });
      }
      break;

    case 'ssh':
      if (args.length > 0) {
        responses.push({ text: `Connecting to ${args[0]}...`, type: 'output' });
        responses.push({ text: `ssh: connect to host ${args[0]} port 22: Connection refused`, type: 'error' });
        responses.push({ text: 'AI Hint: The service might be down, or credentials are required.', type: 'ai-hint' });
      } else {
        responses.push({ text: 'usage: ssh user@hostname', type: 'error' });
      }
      break;

    case 'clear':
      // Handled in the component directly usually, but we can pass a special flag
      responses.push({ text: 'CLEAR_TERMINAL', type: 'output' });
      break;

    default:
      responses.push({ text: `Command not found: ${cmd}. Type 'help' for options.`, type: 'error' });
  }

  return responses;
};
