import PageHero from "../common/PageHero";
import BlogSection from "../Home/BlogSection";
import CommonCallToAction from "../common/CommonCallToAction";

const BlogPage = () => {
  return (
    <>
      <PageHero
        title="Blogs"
        image="/images/contact/hero.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs" },
        ]}
      />
        <BlogSection />
        <CommonCallToAction />
    </>
  );
};

export default BlogPage;