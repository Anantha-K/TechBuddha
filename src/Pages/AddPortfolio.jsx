import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast from "react-hot-toast";

const collegesInIndia = [
  "Indian Institute of Technology (IIT) Bombay",
  "Indian Institute of Technology (IIT) Delhi",
  "Indian Institute of Technology (IIT) Madras",
  "Indian Institute of Technology (IIT) Kanpur",
  "Indian Institute of Technology (IIT) Kharagpur",
  "Indian Institute of Technology (IIT) Roorkee",
  "Indian Institute of Technology (IIT) Guwahati",
  "Indian Institute of Technology (IIT) Hyderabad",
  "Indian Institute of Technology (IIT) Indore",
  "Indian Institute of Technology (IIT) Bhubaneswar",
  "Indian Institute of Technology (IIT) Ropar",
  "Indian Institute of Technology (IIT) Patna",
  "National Institute of Technology (NIT) Trichy",
  "National Institute of Technology (NIT) Surathkal",
  "National Institute of Technology (NIT) Warangal",
  "National Institute of Technology (NIT) Rourkela",
  "National Institute of Technology (NIT) Calicut",
  "National Institute of Technology (NIT) Kurukshetra",
  "National Institute of Technology (NIT) Durgapur",
  "National Institute of Technology (NIT) Jamshedpur",
  "National Institute of Technology (NIT) Raipur",
  "BITS Pilani",
  "BITS Goa",
  "BITS Hyderabad",
  "University of Delhi",
  "Jawaharlal Nehru University (JNU)",
  "Indian Institute of Science (IISc) Bangalore",
  "Vellore Institute of Technology (VIT)",
  "Anna University",
  "Jamia Millia Islamia",
  "Aligarh Muslim University",
  "Banaras Hindu University (BHU)",
  "Amity University",
  "SRM Institute of Science and Technology",
  "Shiv Nadar University",
  "Ashoka University",
  "Manipal Academy of Higher Education",
  "Chandigarh University",
  "Christ University, Bangalore",
  "Lovely Professional University (LPU)",
  "Symbiosis International University, Pune",
  "Osmania University",
  "Guru Gobind Singh Indraprastha University (GGSIPU)",
  "Savitribai Phule Pune University",
  "Tata Institute of Social Sciences (TISS), Mumbai",
  "Jadavpur University",
  "University of Calcutta",
  "University of Hyderabad",
  "Panjab University",
  "Tezpur University",
  "North-Eastern Hill University (NEHU)",
  "Maharaja Sayajirao University of Baroda",
  "Visvesvaraya Technological University (VTU)",
  "Indian Statistical Institute (ISI) Kolkata",
  "Indian School of Business (ISB), Hyderabad",
  "Forest Research Institute (FRI), Dehradun",
  "Sikkim Manipal University",
  "Indian Institute of Space Science and Technology (IIST), Thiruvananthapuram",
  "Federal Institute of Science and Technology (FISAT), Ernakulam",
  "Cochin University of Science and Technology (CUSAT), Kochi",
  "College of Engineering Trivandrum (CET)",
  "Government Engineering College, Thrissur",
  "Rajagiri School of Engineering and Technology, Kochi",
  "National Institute of Fashion Technology (NIFT), Kannur",
  "MES College of Engineering, Kuttippuram",
  "Toc H Institute of Science and Technology, Ernakulam",
  "Government College for Women, Thiruvananthapuram",
  "St. Teresa's College, Ernakulam",
  "Mar Ivanios College, Thiruvananthapuram",
  "Sacred Heart College, Kochi",
  "Farook College, Kozhikode",
  "St. Joseph's College, Devagiri, Kozhikode",
  "Government Law College, Ernakulam",
  "Mahatma Gandhi University (MGU), Kottayam",
  "University of Kerala, Thiruvananthapuram",
  "Kannur University",
  "Calicut University",
  "Amrita Vishwa Vidyapeetham, Kollam",
  "Indian Institute of Management (IIM), Kozhikode",
  "Central University of Kerala, Kasaragod",
];

export default function UserForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    userType: "college",
    collegename: "",
    position: "",
    currentPositions: [""],
    currentRoles: [""],
    year: "",
    cgpa: "",
    testimonials: [""],
    skills: [""],
    portfolioUrl: "",
    image: null,
    certificates: [],
    linkedinUrl: "",
    quotes: [{ quote: "", author: "" }],
  });

  const [error, setError] = useState(null);


const handleSubmit = async (e) => {
  e.preventDefault();
  const addingToast = toast.loading("Adding user...");
  const data = new FormData();

  // Append basic fields
  data.append("fullname", formData.fullname);
  data.append("userType", formData.userType);
  data.append("linkedinUrl", formData.linkedinUrl);

  // Handle quotes
  data.append("quotes", JSON.stringify(formData.quotes));

  if (formData.userType === "college") {
      data.append("collegename", formData.collegename);
      data.append("year", formData.year);
      data.append("currentPositions", JSON.stringify([formData.position]));

      const cgpa = parseFloat(formData.cgpa);
      if (!isNaN(cgpa) && cgpa >= 0 && cgpa <= 10) {
          data.append("cgpa", cgpa.toString());
      } else if (formData.cgpa) {
          toast.error("CGPA must be between 0 and 10", { id: addingToast });
          return;
      }
  } else {
      data.append(
          "currentPositions",
          JSON.stringify(formData.currentPositions.filter((pos) => pos.trim()))
      );
      data.append(
          "currentRoles",
          JSON.stringify(formData.currentRoles.filter((role) => role.trim()))
      );
  }

  if (formData.testimonials.length > 0) {
      data.append(
          "testimonials",
          JSON.stringify(formData.testimonials.filter((t) => t.trim()))
      );
  }

  if (formData.userType === "job" || formData.userType === "development") {
      data.append(
          "skills",
          JSON.stringify(formData.skills.filter((s) => s.trim()))
      );
  }

  if (formData.userType === "marketing" || formData.userType === "development") {
      data.append("portfolioUrl", formData.portfolioUrl);
  }

  if (formData.image) {
      data.append("image", formData.image);
  }

  if (formData.certificates && formData.certificates.length > 0) {
      formData.certificates.forEach((cert) => {
          if (cert) data.append("certificates", cert);
      });
  }

  try {
      const response = await fetch(
          "https://tech-buddha-server-1-xl0n.onrender.com/upload",
          {
              method: "POST",
              body: data,
          }
      );

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add user");
      }

      const result = await response.json();

      if (result.success) {
          toast.success("User added successfully!", { id: addingToast });
          setFormData({
              fullname: "",
              userType: "college",
              collegename: "",
              position: "",
              currentPositions: [""],
              currentRoles: [""],
              year: "",
              cgpa: "",
              testimonials: [""],
              skills: [""],
              portfolioUrl: "",
              image: null,          
              certificates: [],
              linkedinUrl: "",
              quotes: [{ quote: "", author: "" }],
          });
          setError(null);
      } else {
          throw new Error(result.error || "Failed to add user");
      }
  } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to add user", { id: addingToast });
      setError(error.message || "Failed to add user. Please try again.");
  }
};

  return (
    <div className="w-full text-black mx-auto px-4 min-h-screen py-8 mt-24 bg-white">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Add New User</h2>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="userType">User Type</Label>
          <select
            id="userType"
            className="w-full px-4 py-2 border rounded bg-white text-black"
            value={formData.userType}
            onChange={(e) =>
              setFormData({ ...formData, userType: e.target.value })
            }
          >
            <option value="college">College</option>
            <option value="job">Job</option>
            <option value="marketing">Marketing</option>
            <option value="development">Development</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://www.linkedin.com/in/username"
            value={formData.linkedinUrl}
            onChange={(e) =>
              setFormData({ ...formData, linkedinUrl: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Quotes and Authors</Label>
          {formData.quotes.map((quote, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-lg mb-4">
              <Input
                value={quote.quote}
                onChange={(e) => {
                  const newQuotes = [...formData.quotes];
                  newQuotes[index] = { ...quote, quote: e.target.value };
                  setFormData({ ...formData, quotes: newQuotes });
                }}
                placeholder="Enter quote"
                className="mb-2"
              />
              <Input
                value={quote.author}
                onChange={(e) => {
                  const newQuotes = [...formData.quotes];
                  newQuotes[index] = { ...quote, author: e.target.value };
                  setFormData({ ...formData, quotes: newQuotes });
                }}
                placeholder="Enter author"
              />
              {formData.quotes.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    const newQuotes = formData.quotes.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, quotes: newQuotes });
                  }}
                >
                  Remove Quote
                </Button>
              )}
            </div>
          ))}
          {formData.quotes.length < 3 && (
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setFormData({
                  ...formData,
                  quotes: [...formData.quotes, { quote: "", author: "" }],
                })
              }
            >
              Add Quote
            </Button>
          )}
        </div>

        {formData.userType === "college" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="collegename">College Name</Label>
              <Input
                id="collegename"
                list="colleges"
                value={formData.collegename}
                onChange={(e) =>
                  setFormData({ ...formData, collegename: e.target.value })
                }
                required
              />
              <datalist id="colleges">
                {collegesInIndia.map((college, index) => (
                  <option key={index} value={college} />
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <select
                id="year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="block w-full px-3 py-2 border rounded-md text-black bg-white"
                required
              >
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA</Label>
              <Input
                id="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) =>
                  setFormData({ ...formData, cgpa: e.target.value })
                }
                placeholder="Enter CGPA (0-10)"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="currentRoles">Current Role(s)</Label>
          {formData.currentRoles.map((role, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={role}
                onChange={(e) => {
                  const newRoles = [...formData.currentRoles];
                  newRoles[index] = e.target.value;
                  setFormData({ ...formData, currentRoles: newRoles });
                }}
                required
              />
              {formData.currentRoles.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    const newRoles = formData.currentRoles.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, currentRoles: newRoles });
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setFormData({
                ...formData,
                currentRoles: [...formData.currentRoles, ""],
              })
            }
          >
            Add Role
          </Button>
        </div>

        {(formData.userType === "job" ||
          formData.userType === "development") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="currentPositions">Current Position(s)</Label>
              {formData.currentPositions.map((position, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={position}
                    onChange={(e) => {
                      const newPositions = [...formData.currentPositions];
                      newPositions[index] = e.target.value;
                      setFormData({
                        ...formData,
                        currentPositions: newPositions,
                      });
                    }}
                    required
                  />
                  {formData.currentPositions.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newPositions = formData.currentPositions.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          currentPositions: newPositions,
                        });
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFormData({
                    ...formData,
                    currentPositions: [...formData.currentPositions, ""],
                  })
                }
              >
                Add Position
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...formData.skills];
                      newSkills[index] = e.target.value;
                      setFormData({ ...formData, skills: newSkills });
                    }}
                    required
                  />
                  {formData.skills.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newSkills = formData.skills.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, skills: newSkills });
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFormData({
                    ...formData,
                    skills: [...formData.skills, ""],
                  })
                }
              >
                Add Skill
              </Button>
            </div>
          </>
        )}

        {formData.userType === "marketing" && (
          <div className="space-y-2">
            <Label htmlFor="testimonials">Testimonials</Label>
            {formData.testimonials.map((testimonial, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={testimonial}
                  onChange={(e) => {
                    const newTestimonials = [...formData.testimonials];
                    newTestimonials[index] = e.target.value;
                    setFormData({ ...formData, testimonials: newTestimonials });
                  }}
                  required
                />
                {formData.testimonials.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const newTestimonials = formData.testimonials.filter(
                        (_, i) => i !== index
                      );
                      setFormData({
                        ...formData,
                        testimonials: newTestimonials,
                      });
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setFormData({
                  ...formData,
                  testimonials: [...formData.testimonials, ""],
                })
              }
            >
              Add Testimonial
            </Button>
          </div>
        )}

        {(formData.userType === "marketing" ||
          formData.userType === "development") && (
          <div className="space-y-2">
            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
            <Input
              id="portfolioUrl"
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) =>
                setFormData({ ...formData, portfolioUrl: e.target.value })
              }
              placeholder="https://your-portfolio.com"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image (Required)</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFormData({ ...formData, image: selectedFile });
            }}
            required
          />
          {formData.image && (
            <div className="mt-2 text-sm text-gray-600">
              Selected image: {formData.image.name}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="certificates">Certificates (up to 5)</Label>
          <Input
            id="certificates"
            type="file"
            multiple
            accept="application/pdf,image/*"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []).slice(
                0,
                5
              );
              setFormData({ ...formData, certificates: selectedFiles });
            }}
          />
          {formData.certificates.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Selected certificates:{" "}
              {formData.certificates.map((file) => file.name).join(", ")}
              <br />
              {formData.certificates.length}/5 certificates selected
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
