const FullWidthImage = ({ image, alt }) => {
  return (
    <section className="w-full h-[320px] sm:h-[620px] overflow-hidden">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    </section>
  );
};

export default FullWidthImage;