import NextImage, { ImageProps } from "next/image"
import Link from "next/link"

interface BookSessionButtonProps {
  href: string // href must be a string within headerNavLinks { href: __THIS__ }
  title: string
  classes?: string
}

const BookSessionButton: React.FC<BookSessionButtonProps> = ({
  href,
  title,
  classes = "",
  ...rest
}) => (
  <Link
    href={href}
    className={
      classes +
      " inline-flex mt-12 justify-center md:mt-8 items-center w-full px-8 py-5 md:mb-6 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-700 sm:mb-0 md:w-auto hover:bg-indigo-600 md:rounded-full"
    }>
    {title}
  </Link>
)

export default BookSessionButton
