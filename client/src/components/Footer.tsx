import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function GlobalFooter() {
  return (
    <Footer container className=" rounded-t-none">
      <div className="w-full text-center">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href=""
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Myapp"
          />
          <FooterLinkGroup className="mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-6">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider className="my-4" />
        <FooterCopyright href="#" by="Giacomo Giraldi" year={2024} />
      </div>
    </Footer>
  );
}