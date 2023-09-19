import { createEffect } from 'solid-js';

const AutoGrowingTextarea = (props) => {
  let textRef;
  
  const resize = () => {
    textRef.style.height = 'auto';
    textRef.style.height = textRef.scrollHeight + 'px';
  }

  // Handle the input event by calling resize and any onInput function provided in props
  const handleInput = (event) => {
    if (props.onInput) {
      props.onInput(event);
    }
    resize();
  }

  createEffect(() => {
    if (props.valueSignal) {
      props.valueSignal();
    }
    resize();
  });

  return (
    <textarea
      {...props}
      ref={textRef}
      onInput={handleInput}
      rows="1"
      style="overflow:hidden"
      value={props.valueSignal ? props.valueSignal() : props.value}
    />
  );
};

export default AutoGrowingTextarea;
