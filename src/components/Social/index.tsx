import { ReactNode } from "react"

interface SocialProps {
  children: ReactNode;
  url: string;
}

const Social = ({ children, url }: SocialProps) => {
  return (
    <a href={url} target="_blank">{children}</a>
  )
}

export default Social