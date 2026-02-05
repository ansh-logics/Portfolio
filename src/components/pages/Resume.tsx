const Resume = () => {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <iframe
          src={`${process.env.PUBLIC_URL}/CV.pdf`}
          title="PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    );
  };
  
  export default Resume;
  