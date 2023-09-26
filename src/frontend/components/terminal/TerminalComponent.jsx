import { onCleanup, onMount } from 'solid-js';
import 'xterm/css/xterm.css';
import terminalConnection from '../../service/terminal/terminalConnection';
import { setupXTerm } from '../../service/terminal/setupXTerm';
import { sendTerminalResizeNotification } from '../../service/terminal/sendTerminalResizeNotification';
import DetailsComponent from '../DetailsComponent';
import VirtualButton from './VirtualButton';

const TerminalComponent = () => {
  let container;
  const { term, fitAddon } = setupXTerm();

  const sendVirtualKey = (key) => {
    terminalConnection.sendDataToTerminal(JSON.stringify({ type: 'input', data: key }));
  };

  onMount(() => {
    term.open(container);
    fitAddon.fit();

    const { rows, cols } = term;
    sendTerminalResizeNotification(rows, cols);

    terminalConnection.setOnDataReceived((data) => {
      term.write(data);
    });

    term.onData((data) => {
      terminalConnection.sendDataToTerminal(JSON.stringify({ type: 'input', data }));
    });

    term.onResize(({ newRows, newCols }) => {
      sendTerminalResizeNotification(newRows, newCols);
    });
  });
  
  onCleanup(() => {
    term.dispose();
    terminalConnection.closeConnection();
  });

  return (
    <DetailsComponent 
      defaultState="closed"
      localStorageKey="terminalState"
      generateHeader={() => "Terminal"}
      classes="rounded border p-2 w-full border-border bg-emphasize"
    >
      <div class="flex overflow-x-auto whitespace-nowrap">
        <VirtualButton label="Esc" action={() => sendVirtualKey('\x1B')} />
        <VirtualButton label="-" action={() => sendVirtualKey('-')} />
        <VirtualButton label=":" action={() => sendVirtualKey(':')} />
        <VirtualButton label="Ctrl-Z" action={() => sendVirtualKey('\x1A')} />
        <VirtualButton label="Ctrl-Y" action={() => sendVirtualKey('\x19')} />
        <VirtualButton label="Ctrl-X" action={() => sendVirtualKey('\x18')} />
        <VirtualButton label="Ctrl-V" action={() => sendVirtualKey('\x16')} />
        <VirtualButton label="F1" action={() => sendVirtualKey('\x1BOP')} />
        <VirtualButton label="F5" action={() => sendVirtualKey('\x1B[15~')} />
        <VirtualButton label="F6" action={() => sendVirtualKey('\x1B[17~')} />
        <VirtualButton label="F7" action={() => sendVirtualKey('\x1B[18~')} />
      </div>
      <div ref={container}>
        {/* The terminal will be rendered inside this div */}
      </div>
    </DetailsComponent>
  );
};

export default TerminalComponent;
