import React, { useContext, useState } from "react";
import { Container, Tab, Tabs, Form, Button, Card } from "react-bootstrap";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";

function Profile() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    bday: "",
    gender: "male",
    weight: "",
    height: "",
    activity: "sedentary",
    allergies: "",
    goal: "weight_loss",
  });
  const { showMessage, setLoading } = useContext(NotificationContext);
  const {
    uemail,
    setUEmail,
    uname,
    setUname,
    isAuth,
    setIsAuth,
    uBday,
    setUBday,
    setUAge,
    uGender,
    setUGender,
    uWeight,
    setUWeight,
    uHeight,
    setUHeight,
    uActivity,
    setUActivity,
    uAllergy,
    setUAllergy,
    uGoal,
    setUGoal,
  } = useContext(UserContext);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    showMessage("Please wait!");
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const endpoint =
      activeTab === "login" ? "/api/users/login" : "/api/users/register";
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ERROR: Something went wrong");
      }
      console.log(data);
      setProfile((prev) => ({
        ...prev,
        email: data.user.email,
        name: data.user.name,
      }));
      setUname(data.user.name);
      setUEmail(data.user.email);
      setUBday(data.user.birthday);
      setUAge(data.user.birthday && getAge(data.user.birthday));
      setUGender(data.user.gender);
      setUWeight(data.user.weight);
      setUHeight(data.user.height);
      setUActivity(data.user.activity);
      setUAllergy(data.user.allergy);
      setUGoal(data.user.goal);
      setIsAuth(true);
      localStorage.setItem("token", data.token);
      setLoading(false);
      showMessage("Successfully logged in");
    } catch (error) {
      setLoading(false);
      showMessage(`ERROR: ${error.message}`);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setUBday(profile.bday||uBday);
    setUAge(getAge(profile.bday||uBday));
    setUGender(profile.gender||uGender);
    setUWeight(profile.weight||uWeight);
    setUHeight(profile.height||uHeight);
    setUActivity(profile.activity||uActivity);
    setUAllergy(profile.allergies||uAllergy);
    setUGoal(profile.goal||uGoal);
    console.log(profile);
    showMessage("Profile updated successfully!");
  };

  const getAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    if (
      month < birthDate.getMonth() ||
      (month === birthDate.getMonth() && day < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <Container className="mt-4">
      {!isAuth ? (
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profile.email || uemail}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name || uname}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="bday"
                value={profile.bday || uBday}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={profile.gender || uGender}
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
                value={profile.weight || uWeight}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={profile.height || uHeight}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Activity Level</Form.Label>
              <Form.Select
                name="activity"
                value={profile.activity || uActivity}
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
                value={profile.allergies || uAllergy}
                onChange={handleProfileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Health Goal</Form.Label>
              <Form.Select
                name="goal"
                value={profile.goal || uGoal}
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
