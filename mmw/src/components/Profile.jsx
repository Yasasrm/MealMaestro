import React, { useContext, useState } from "react";
import { Container, Tab, Tabs, Form, Button, Card } from "react-bootstrap";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";

function Profile() {
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
    uTcal,
    setUTcal,
    uTcarb,
    setUTcarb,
    uTpro,
    setUTpro,
    uTfat,
    setUTfat,
  } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [profile, setProfile] = useState({
    email: uemail || "",
    name: uname || "",
    birthday: uBday || "",
    gender: uGender || "male",
    weight: uWeight || "",
    height: uHeight || "",
    activity: uActivity || "sedentary",
    allergy: uAllergy || "",
    goal: uGoal || "weight_loss",
    tcal: uTcal || "",
    tcarb: uTcarb || "",
    tpro: uTpro || "",
    tfat: uTfat || "",
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    showMessage("Please wait!");
    setLoading(true);
    const endpoint =
      activeTab === "login" ? "/api/users/login" : "/api/users/register";
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
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
      setProfile(() => ({
        email: data.user.email,
        name: data.user.name,
        birthday: data.user.birthday && data.user.birthday.split("T")[0],
        gender: data.user.gender,
        weight: data.user.weight,
        height: data.user.height,
        activity: data.user.activity,
        allergy: data.user.allergy,
        goal: data.user.goal,
        tcal: data.user.uTcal,
        tcarb: data.user.uTcarb,
        tpro: data.user.uTpro,
        tfat: data.user.uTfat,
      }));
      setUname(data.user.name);
      setUEmail(data.user.email);
      setUBday(data.user.birthday && data.user.birthday.split("T")[0]);
      setUAge(data.user.birthday && getAge(data.user.birthday.split("T")[0]));
      setUGender(data.user.gender);
      setUWeight(data.user.weight);
      setUHeight(data.user.height);
      setUActivity(data.user.activity);
      setUAllergy(data.user.allergy);
      setUGoal(data.user.goal);
      setUTcal(data.user.uTcal);
      setUTcarb(data.user.uTcarb);
      setUTpro(data.user.uTpro);
      setUTfat(data.user.uTfat);
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

  const handleSaveProfile = async () => {
    const updatedProfile = { ...profile, email: uemail };

    showMessage("Please wait...");
    setLoading(true);

    try {
      const apiCalResponse = await fetch(`${API_URL}/api/ai/getUserTarget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      if (!apiCalResponse.ok) throw new Error("Failed to fetch target");

      const resultTarget = await apiCalResponse.json();

      const finalProfile = {
        ...updatedProfile,
        tcal: resultTarget[0].Calorie,
        tcarb: resultTarget[0].Carbohydrates,
        tpro: resultTarget[0].Proteins,
        tfat: resultTarget[0].Fats,
      };

      setProfile(finalProfile);

      const response = await fetch(`${API_URL}/api/users/saveProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProfile),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      const result = await response.json();
      const user = result.user;

      setUname(user.name);
      setUEmail(user.email);
      setUBday(user.birthday.split("T")[0]);
      setUAge(user.birthday && getAge(user.birthday.split("T")[0]));
      setUGender(user.gender);
      setUWeight(user.weight);
      setUHeight(user.height);
      setUActivity(user.activity);
      setUAllergy(user.allergy);
      setUGoal(user.goal);

      setLoading(false);
      showMessage(`Profile saved successfully: ${result.message}`);
      return result;
    } catch (error) {
      setLoading(false);
      showMessage(`ERROR: Failed to save profile: ${error.message}`);
      return null;
    }
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
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={profile.birthday}
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
              <Form.Label>Allergies (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="allergy"
                value={profile.allergy}
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
