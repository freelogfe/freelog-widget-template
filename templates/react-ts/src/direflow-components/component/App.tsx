import React, {FC, useContext} from 'react';
import {EventContext, Styled} from 'direflow-component';
import styles from './App.scss';

interface IProps {
  componentTitle: string;
  sampleList: string[];
  logo: string;
}

const App: FC<IProps> = (props: { sampleList: string[]; componentTitle: any; logo: string; }) => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  };

  const renderSampleList = props.sampleList.map((sample: string) => (
      <div key={sample} className='sample-text'>
        → {sample}
      </div>
  ));

  return (
      <Styled styles={styles}>
        <div className="wrapper">
          <span><img onClick={handleClick} src={'https://silind-s3.s3.eu-west-2.amazonaws.com/direflow/logo.svg'} alt=""/></span>
          <h3 className="info">{props.componentTitle}</h3>
          {renderSampleList}
        </div>
      </Styled>
  );
};

App.defaultProps = {
  componentTitle: 'Hello Freelog !',
  sampleList: [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
  ],
  logo: '//silind-s3.s3.eu-west-2.amazonaws.com/direflow/logo.svg',
};

export default App;
