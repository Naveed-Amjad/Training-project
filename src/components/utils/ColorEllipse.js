function ColorEllipse({ color }) {
  const ellipseStyle = {
    width: '20px', // Adjust the size as needed
    height: '20px', // Adjust the size as needed
    backgroundColor: color,
    borderRadius: '50%' // This makes the element circular
  };

  return <div style={ellipseStyle}></div>;
}

export default ColorEllipse;
