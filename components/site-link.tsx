import { forwardRef, type AnchorHTMLAttributes } from "react";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const Link = forwardRef<HTMLAnchorElement, SiteLinkProps>(function SiteLink({ href, children, ...props }, ref) {
  return <a ref={ref} href={href} {...props}>{children}</a>;
});

export default Link;
