import React, { useState } from "react";
import { Container, Tab, Tabs, Form, Button, Card } from "react-bootstrap";

function Profile() {
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity: "sedentary",
    allergies: "",
    goal: "weight_loss",
    calorieIntake: 0,
    macroIntake: 0,
  });

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setUser({ email: formData.email, name: formData.name });
    setProfile((prev) => ({
      ...prev,
      email: formData.email,
      name: formData.name,
    }));
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  return (
    <Container className="mt-4">
      {!user ? (
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleAuthSubmit} className="p-3 border rounded">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>
              <Button type="submit" className="mt-3 w-100">
                Login
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="register" title="Register">
            <Form onSubmit={handleAuthSubmit} className="p-3 border rounded">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>
              <Button type="submit" className="mt-3 w-100">
                Register
              </Button>
            </Form>
          </Tab>
        </Tabs>
      ) : (
        <Card className="p-4">
          <h3 className="text-center">Profile Information</h3>
          <Form>
            <Form.Group>
              <Form.Label>Email (Uneditable)</Form.Label>
              <Form.Control type="email" value={profile.email} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={profile.age}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={profile.gender}
                onChange={handleProfileChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={profile.height}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Activity Level</Form.Label>
              <Form.Select
                name="activity"
                value={profile.activity}
                onChange={handleProfileChange}
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="very_active">Very Active</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Allergies</Form.Label>
              <Form.Control
                type="text"
                name="allergies"
                value={profile.allergies}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Health Goal</Form.Label>
              <Form.Select
                name="goal"
                value={profile.goal}
                onChange={handleProfileChange}
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </Form.Select>
            </Form.Group>
            <Button className="mt-3 w-100" onClick={handleSaveProfile}>
              Save
            </Button>
          </Form>
        </Card>
      )}
    </Container>
  );
}

export default Profile;
