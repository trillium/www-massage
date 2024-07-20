import AuthorCard from "@/components/AuthorCard"
import BookSessionButton from "@/components/BookSessionButton"

export default function About({}) {
  return (
    <>
      <AuthorCard />
      <div className="tailwind flex items-center justify-center">
        <BookSessionButton title="Book a Session!" href="/book" />
      </div>
    </>
  )
}
