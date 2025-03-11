import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Trash2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const API_BASE_URL = "https://tech-buddha-server-0dge.onrender.com";

export default function EditAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, [retryCount]);

  const fetchAchievements = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/achievements`);
      
      if (response.status === 404) {
        throw new Error("Achievement service is currently unavailable");
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch achievements (Status: ${response.status})`);
      }
      
      const data = await response.json();
      setAchievements(data.data || []);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const updatingToast = toast.loading("Updating achievement...");
    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("date", updatedData.date);
      
      if (updatedData.newImages?.length) {
        Array.from(updatedData.newImages).forEach((image) => {
          formData.append("image", image);
        });
      }

      const response = await fetch(
        `${API_BASE_URL}/achievements/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.status === 404) {
        throw new Error("Achievement not found");
      }

      if (!response.ok) {
        throw new Error(`Failed to update achievement (Status: ${response.status})`);
      }

      toast.success("Achievement updated successfully!", { id: updatingToast });
      fetchAchievements();
    } catch (error) {
      toast.error(error.message, { id: updatingToast });
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    const deletingToast = toast.loading("Deleting achievement...");
    try {
      const response = await fetch(
        `${API_BASE_URL}/achievements/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 404) {
        throw new Error("Achievement not found");
      }

      if (!response.ok) {
        throw new Error(`Failed to delete achievement (Status: ${response.status})`);
      }
      
      toast.success("Achievement deleted successfully!", { id: deletingToast });
      setAchievements(achievements.filter((achievement) => achievement._id !== id));
    } catch (error) {
      toast.error(error.message, { id: deletingToast });
      setError(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading achievements...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 min-h-screen py-8 mt-24 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Edit Achievements</h2>
        <Button onClick={() => setRetryCount(c => c + 1)} variant="outline">
          Refresh
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            {error}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setRetryCount(c => c + 1)}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {achievements.length === 0 && !error && (
        <Alert className="mb-6">
          <AlertDescription>No achievements found.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {achievements.map((achievement) => (
          <Card key={achievement._id} className="w-full">
            <CardHeader>
              <CardTitle>{achievement.name || "Untitled Achievement"}</CardTitle>
              <CardDescription>
                Added on: {achievement.date ? new Date(achievement.date).toLocaleDateString() : "Date not available"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleUpdate(achievement._id, {
                  name: formData.get("name"),
                  date: formData.get("date"),
                  newImages: formData.get("images").files,
                });
              }}>
                <div>
                  <Label htmlFor={`name-${achievement._id}`}>Achievement Name</Label>
                  <Input
                    id={`name-${achievement._id}`}
                    name="name"
                    defaultValue={achievement.name || ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`date-${achievement._id}`}>Date</Label>
                  <Input
                    id={`date-${achievement._id}`}
                    name="date"
                    type="date"
                    defaultValue={formatDate(achievement.date)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`images-${achievement._id}`}>Add New Images</Label>
                  <Input
                    id={`images-${achievement._id}`}
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Update
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this achievement? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-4 mt-4">
                        <Button 
                          variant="destructive"
                          onClick={() => handleDelete(achievement._id)}
                          disabled={deletingId === achievement._id}
                        >
                          {deletingId === achievement._id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Delete Achievement'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mt-4">
                  <Label>Current Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {achievement.imageUrls?.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Achievement ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
