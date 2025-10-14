import blogEntries from "./_config/data";
import { BlogCard, FilterTags, NoRecords } from "./_components";

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string[] }>;
}) => {
  const tags = [(await searchParams).tag || []].flat();

  const filteredEntries = blogEntries.filter((entry) =>
    tags.every((tag) => entry.tags.includes(tag)),
  );

  const entries = tags.length > 0 ? filteredEntries : blogEntries;
  return (
    <div className="overflow-auto flex-col max-h-[calc(100dvh-170px)]">
      <FilterTags />
      <div className="flex justify-center py-4">
        {entries.length === 0 ? (
          <NoRecords />
        ) : (
          <div className="mr-6 grid h-[110%] justify-center sm:w-dvw sm:[grid-template-columns:repeat(auto-fit,minmax(33rem,0))] sm:gap-12 sm:px-10">
            {entries.map((entry) => (
              <BlogCard
                key={entry.id}
                id={entry.id}
                title={entry.title}
                description={entry.description}
                date={entry.date}
                tags={entry.tags}
                content={entry.content}
                cover={entry.cover}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
