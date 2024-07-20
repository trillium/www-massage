import Image from "./Image"
// import SocialIcon from '@/components/social-icons'
import siteMetadata from "@/data/siteMetadata"

const AuthorCard = () => {
  const {
    author,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    location,
  } = siteMetadata
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-2 pb-8">
        {avatar && (
          <div className="pr-2 xl:pr-4">
            <Image
              src={avatar}
              alt="avatar"
              width={224}
              height={224}
              className="h-48 w-48 min-w-48 rounded-full md:h-52 md:w-52"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 pt-4  text-2xl font-bold leading-8 tracking-tight sm:text-3xl md:text-4xl">
            {author}
          </h3>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">
            {occupation}
          </div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">
            {company}
          </div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">
            {location}
          </div>
          {/* <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="twitter" href={twitter} />
          </div> */}
        </div>
      </div>
      <div className="flex max-w-full flex-col items-center justify-center">
        <div className="prose max-w-full pb-8 pt-10 dark:prose-invert xl:text-xl">
          <p className="py-2">
            Trillium is a seasoned massage therapist with a decade of
            experience, serving the vibrant Los Angeles area. Based in
            Westchester, Trillium has built a reputation for providing effective
            massage therapy with a combined focus on relaxation and pain relief.
            His experience and commitment to client well-being have clients
            saying &quot;5-star service&quot; after over 3,000 sessions across
            in-home, in-office, and event locations.
          </p>
          <p className="py-2">
            Specializing in in-home massage and chair massage, Trillium brings
            relaxation and therapeutic relief directly to his clients. This
            mobile approach ensures that clients can enjoy a massage in the
            comfort of their own homes or workplaces, offering convenience and a
            tailored experience. Whether it&apos;s relieving stress, alleviating
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
