import { Button } from 'react-bootstrap';

const ReactButton = ({
  className,
  type,
  id,
  size,
  placeholder,
  onClick,
  style,
  isEnabledbtn,
}) => {
  // console.log('value of isEnabledbtn in customButton = ', isEnabledbtn);
  return (
    <>
      <Button disabled={isEnabledbtn} style={style} className={className} variant={type} id={id} size={size} onClick={onClick}>{placeholder}</Button>
    </>
  );
};

export default ReactButton;
