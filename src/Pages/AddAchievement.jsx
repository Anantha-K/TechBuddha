import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast from "react-hot-toast";

export default function AchievementsForm() {
  const [formData, setFormData] = useState({
    name: "",
    images: [],
    date: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addingToast = toast.loading("Adding achievement...");

    if (!formData.name || !formData.images.length || !formData.date) {
      toast.error("Name, date, and images are required", { id: addingToast });
      return;
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("date", formData.date);
    formData.images.forEach((image) => {
      data.append("image", image);
    });

    try {
      const response = await fetch("https://tech-buddha-server-0dge.onrender.com/achievements", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add achievement");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Achievement added successfully!", { id: addingToast });
        setFormData({
          name: "",
          images: [],
          date: "",
        });
        setError(null);
      } else {
        throw new Error(result.error || "Failed to add achievement");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to add achievement", { id: addingToast });
      setError(error.message || "Failed to add achievement. Please try again.");
    }
  };

  return (
    <div className="w-full text-black mx-auto px-4 min-h-screen py-8 mt-24 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Add Achievement</h2>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Achievement Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Images (Required)</Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              setFormData({ ...formData, images: selectedFiles });
            }}
            required
          />
          {formData.images.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Selected images: {formData.images.map((file) => file.name).join(", ")}
              <br />
              {formData.images.length} images selected
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
