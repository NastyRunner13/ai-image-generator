import Loader from "../components/Loader";
import Card from "../components/Card";
import FormField from "../components/FormField";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328]">The Comunity Showcase</h1>
      </div>
    </section>
  );
}
