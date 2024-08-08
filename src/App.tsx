import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Divider, Space, Tour, TourProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { StyleProvider } from '@ant-design/cssinjs';

function App() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const shadowDomRef= useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];
  const [shadowRoot, setShadowRoot] = useState(undefined);
  useEffect(()=>{
    if(!shadowDomRef.current){
      return;
    }
    // @ts-ignore
    const sr = shadowDomRef?.current?.attachShadow?.({ mode: 'closed' });
    setShadowRoot(sr);
    document.body.insertAdjacentElement('beforebegin', shadowDomRef.current);
  }, []);

  
  return (
    <>
      <div 
        style={{
          position: 'sticky'
        }}
        className='tour-shadow-holder' 
        ref={shadowDomRef}
      >

      </div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Divider />
      <Space>
        <Button ref={ref1}> Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>
      {shadowRoot && <StyleProvider container={shadowRoot}>
       <Tour getPopupContainer={()=>shadowRoot} open={open} onClose={() => setOpen(false)} steps={steps} />
      </StyleProvider>}
    </>
  );
}

export default App;
