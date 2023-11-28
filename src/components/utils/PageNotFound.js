import Lottie from 'lottie-react';
import PageNotFoundAnimation from '../../assets/PageNotFoundAnimation.json';
const PageNotFound = () => {
  return (
    <>
      <Lottie
        style={{
          height: '600px',
          width: '600px',
          margin: '100px 0px 0px 400px',
        }}
        animationData={PageNotFoundAnimation}
        loop={true}
      />
      <h1 style={{ margin: '-150px 0px 0px 580px', color: 'blue' }}>Page Not Found</h1>
    </>
  );
};

export default PageNotFound;
