import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const infoSectionRef = useRef(null);

  const handleScrollToSection = () => {
    if (infoSectionRef.current) {
      (infoSectionRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-black dark:text-white text-center">
      <div className="h-screen flex flex-col items-center justify-center p-8 bg-gray-200 dark:bg-gray-900 w-full">
        <h1 className="font-bold mb-4">Application</h1>
        <h2 className="mb-8">Test Description</h2>
        <div>
          <Button onClick={handleScrollToSection}>
            <p>Get Started</p>
          </Button>
        </div>
      </div>

      <div
        ref={infoSectionRef}
        className="p-8 bg-gray-100 dark:bg-gray-800 w-full"
      >
        <h2 className="text-4xl font-bold mb-6">Features</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              euismod, nisi vel consectetur.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              euismod, nisi vel consectetur.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              euismod, nisi vel consectetur.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-200 dark:bg-gray-900 w-full">
        <h2 className="text-4xl font-bold mb-6">Lorem 2</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg italic">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt,
              assumenda!
            </p>
            <p className="mt-4 font-semibold">User 1</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg italic">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              tempore.
            </p>
            <p className="mt-4 font-semibold">User 2</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg italic">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima,
              similique.
            </p>
            <p className="mt-4 font-semibold">User 3</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-300 dark:bg-gray-700 w-full">
        <h2 className="text-4xl font-bold mb-6">About the App</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
              laboriosam odio molestias nostrum veritatis. Hic laudantium eum
              illum animi omnis.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              euismod, nisi vel consectetur.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              euismod, nisi vel consectetur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
