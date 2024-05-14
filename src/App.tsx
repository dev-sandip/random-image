import { useState } from "react";
import { Button } from "./components/ui/button";
import { getImages } from "./http/api";
import toast from "react-hot-toast";
import { DownloadIcon } from "lucide-react";
import { saveAs } from "file-saver";

type ImageData = {
  alt_description: string;
  urls: {
    full: string;
    regular: string;
  };
  links: {
    download: string;
  };
  alternative_slugs: {
    en: string;
  };
};
const App = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await getImages();
      const data = response.data;
      setImageData(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching images: " + (error as Error).message);
    }
  };
  const copyLink = () => {
    if (!imageData) {
      toast.error("No Image Data Found");
    } else {
      navigator.clipboard.writeText(imageData.urls.full);
      toast.success("Link Copied to Clipboard");
    }
  };
  const downloadImage = () => {
    if (!imageData) {
      toast.error("No Image Data Found");
    } else {
      setDownloaded(false);
      saveAs(imageData.urls.full, `${imageData.alternative_slugs.en}.jpg`);
      setDownloaded(true);
      if (downloaded) {
        toast.success("Image Downloaded Successfully!");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center overflow-y-hidden min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
          Random Image Generator
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Utilizes Unsplash API to Retrieve Random Images and Photos with Links
          for Testing Purposes
        </p>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Developed By:{" "}
          <a
            className="text-purple-400"
            href="https://github.com/dev-sandip"
            target="_blank"
          >
            dev-sandip
          </a>{" "}
          with ❤️
        </p>
        <div className="flex justify-center">
          {loading ? (
            <Button
              disabled
              className="bg-gray-900 hover:bg-gray-800 text-gray-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Loading
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              className="bg-gray-900 hover:bg-gray-800 text-gray-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Get Image
            </Button>
          )}
        </div>
      </div>
      {imageData && (
        <div className="mt-12 w-full max-w-3xl">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <img
              alt="Random Image"
              className="w-full h-auto"
              height="400"
              src={imageData.urls.regular}
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
            <div className="bg-white dark:bg-gray-950 p-4 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                {imageData.alt_description || "No Description"}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={copyLink}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  variant="outline"
                >
                  Copy Link
                </Button>
                <Button
                  onClick={downloadImage}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  variant="outline"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
