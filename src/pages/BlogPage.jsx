import PageHero from "../common/PageHero";
import BlogSection from "../Home/BlogSection";

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
    </>
  );
};

export default BlogPage;