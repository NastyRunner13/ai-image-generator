import Loader from "../components/Loader";
import Card from "../components/Card";
import FormField from "../components/FormField";
import { useEffect, useState, useRef } from "react";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card
        key={post._id}
        name={post.name}
        prompt={post.prompt}
        photo={post.photo}
      />
    ));
  }
  return (
    <h2
      className="mt-5 font-bold text-[#6449ff]
    text-xl uppercase"
    >
      {title}
    </h2>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const allPosts = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        await fetch("http://localhost:8000/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            allPosts.current = result.data.reverse();
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [allPosts]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.current.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1
          className="font-extrabold text-[#222328]
        text-[32px]"
        >
          The Comunity Showcase
        </h1>
        <p
          className="mt-2 text-[#666e75] text-[16px]
        max-w-[500px]"
        >
          {" "}
          Browse through a collection of imaginative and visually stunning
          images created by AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          LabelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2
                className="font-medium
               text-[#666e75] text-xl mb-3"
              >
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div
              className="grid lg:grid-cols-4 sm:grid-cols-3
            xs:grid-cols-2 grid-cols-1 gap-3"
            >
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts.current} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
