"use client";

import { useRef, useState } from "react";

export default function TshirtDesigner() {
  const [logo, setLogo] = useState(null); // Store the logo as an image object
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Logo position
  const [size, setSize] = useState(100); // Logo size (width/height)
  const tshirtContainerRef = useRef(null); // Reference to the T-shirt container

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result); // Convert file to base64
      reader.readAsDataURL(file);
    }
  };

  // Handle mouse drag
  const handleDrag = (e) => {
    const rect = tshirtContainerRef.current.getBoundingClientRect(); // T-shirt container bounds
    const x = e.clientX - rect.left; // Adjust for T-shirt container's left offset
    const y = e.clientY - rect.top; // Adjust for T-shirt container's top offset

    // Ensure logo stays within the T-shirt container
    const adjustedX = Math.max(0, Math.min(x - size / 2, rect.width - size));
    const adjustedY = Math.max(0, Math.min(y - size / 2, rect.height - size));

    setPosition({ x: adjustedX, y: adjustedY });
  };

  // Handle resizing
  const handleResize = (e) => {
    const newSize = Math.max(50, parseInt(e.target.value, 10)); // Minimum size is 50
    setSize(newSize);
  };

  // Combine the T-shirt and logo into one image
  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const tshirtContainer = tshirtContainerRef.current;
    const rect = tshirtContainer.getBoundingClientRect();

    // Set canvas size based on T-shirt container size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw T-shirt
    const tshirtImage = tshirtContainer.querySelector("img");
    const tshirt = new Image();
    tshirt.src = tshirtImage.src;

    tshirt.onload = () => {
      context.drawImage(tshirt, 0, 0, rect.width, rect.height);

      // Draw logo
      if (logo) {
        const img = new Image();
        img.src = logo;

        img.onload = () => {
          context.drawImage(img, position.x, position.y, size, size);

          // Download the image
          const link = document.createElement("a");
          link.download = "tshirt-design.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
      }
    };
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-4">T-Shirt Designer</h1>
      <div className="mb-4">
        <label className="block mb-2">Upload Logo:</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
      </div>
      <div
        className="relative w-[400px] h-[500px] border border-gray-300 bg-white"
        ref={tshirtContainerRef}
      >
        {/* T-Shirt Canvas */}
        <img
          src="/images/tshirt.jpg"
          alt="T-shirt"
          className="w-full h-full pointer-events-none"
        />

        {/* Draggable Logo */}
        {logo && (
          <img
            src={logo}
            alt="Logo"
            className="absolute cursor-move"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            draggable={true}
            onDragEnd={handleDrag}
          />
        )}
      </div>
      {logo && (
        <div className="mt-4">
          <label className="block mb-2">Resize Logo:</label>
          <input
            type="range"
            min="50"
            max="200"
            value={size}
            onChange={handleResize}
          />
        </div>
      )}
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleDownload}
      >
        Download Final Image
      </button>
    </div>
  );
}
