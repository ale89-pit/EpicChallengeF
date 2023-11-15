import {
  Button,
  Container,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AiOutlineUser } from "react-icons/ai";
import { useState,useEffect } from "react";
import { getProfile, setProfile } from "../redux/actions";
import { useAppDispatch } from "../redux/app/hooks";
import { Profile } from "../redux/reducers/profile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { initialState } from "../redux/reducers/profile";

const NavbarComponent = () => {
  const currentProfile: Profile = useSelector((state: RootState) => state.profile);
  const isLogged: boolean = currentProfile.id != null ? false : true;
  let isUser: boolean = false;
  let isLibrary: boolean = false;
  if (isLogged) {
    isUser = currentProfile?.roles[0]?.roleName === "ROLE_USER";
    isLibrary = currentProfile?.roles[0]?.roleName === "ROLE_MODERATOR";
  }
  useEffect(()=>{

  },[])

  useEffect(()=>{

  },[isLogged])
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-danger">
      <Container fluid>
        <Navbar.Brand id="title">Bibliotech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            {/* Navbar lg */}
            <span className="d-none d-lg-flex justify-content-between w-100">
              <span className="d-flex ">
                <Link to="/" className="text-decoration-none">
                  <div className="nav-link me-2">Home</div>
                </Link>
                <Link to="/libraries" className="text-decoration-none">
                  <div className="nav-link me-2">Libraries</div>
                </Link>
                <Link to="/books" className="text-decoration-none">
                  <div className="nav-link me-2">Books</div>
                </Link>
              </span>
              <span className="me-5 pe-4">
                <NavDropdown
                  title={
                    <>
                      {currentProfile.id
                        ? currentProfile.name || currentProfile.fullname
                        : "Profile"}
                      <AiOutlineUser className="ms-1" />
                    </>
                  }
                  className="d-flex align-items-center text-decoration-none"
                >
                  <ul className="">
                    {!currentProfile.id ? (
                      <>
                        <RegisterModal />
                        <LoginModal />
                      </>
                    ) : (
                      <>
                        <LogoutButton />
                        <Link
                          to="/profile"
                          className="text-decoration-none nav-link list-unstyled"
                        >
                          Profile
                        </Link>
                      </>
                    )}
                  </ul>
                </NavDropdown>
              </span>
            </span>

            {/* Navbar mobile */}
            <span className="d-lg-none">
              <span>
                <Link to="/" className="text-decoration-none">
                  <div className="nav-link me-2">Home</div>
                </Link>
                <Link to="/libraries" className="text-decoration-none">
                  <div className="nav-link me-2">Libraries</div>
                </Link>
                <Link to="/books" className="text-decoration-none">
                  <div className="nav-link me-2">Books</div>
                </Link>
              </span>
              <span className="text-light">
                {currentProfile.id ? (
                  currentProfile.name || currentProfile.fullname
                ) : (
                  <AiOutlineUser />
                )}
                <ul className="ps-0 text-decoration-none">
                  {isLogged ? (
                    <>
                      <RegisterModal />
                      <LoginModal />
                    </>
                  ) : (
                    <>
                      <LogoutButton />
                      <Link
                        to="/profile"
                        className="text-decoration-none nav-link list-unstyled"
                      >
                        Profile
                      </Link>
                    </>
                  )}
                </ul>
              </span>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;

function RegisterModal() {
  const [show, setShow] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("user");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [libraryName, setLibraryName] = useState<string>("");
  const [libraryEmail, setLibraryEmail] = useState<string>("");
  const [libraryPassword, setLibraryPassword] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  interface RegisterDto {
    name: string;
    username: string;
    email: string;
    password: string;
  }
  const register = async (endpoint: string, registerDto: RegisterDto) => {
    try {
      let response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(registerDto),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Check your email to activate account.");
      } else {
        let error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  return (
    <>
      <li onClick={handleShow} className="nav-link list-unstyled">
        Register
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <span className="d-flex">
          <Button
            className="w-25 ms-1"
            variant="tertiary"
            onClick={() => setTab("user")}
          >
            User
          </Button>
          <Button
            className="w-25 ms-1"
            variant="tertiary"
            onClick={() => setTab("library")}
          >
            Library
          </Button>
        </span>

        {tab === "user" && (
          <>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="userFullName">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Mario Rossi"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="mario.rossi"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="userPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="···············"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  register("http://localhost:8080/api/auth/register", {
                    name: userName,
                    username: username,
                    email: userEmail,
                    password: userPassword,
                  });
                  handleClose();
                }}
              >
                Register
              </Button>
            </Modal.Footer>
          </>
        )}
        {tab === "library" && (
          <>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="libraryName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLibraryName(e.target.value)}
                  placeholder="Municipal Library"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="libraryEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setLibraryEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="libraryPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setLibraryPassword(e.target.value)}
                  placeholder="···············"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  register("http://localhost:8080/api/auth/registerLibrary", {
                    name: libraryName,
                    username: "",
                    email: libraryEmail,
                    password: libraryPassword,
                  });
                  handleClose();
                }}
              >
                Register
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

function LoginModal() {
  const [show, setShow] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  interface LoginDto {
    username: string;
    password: string;
  }
  const login = async (loginDto: LoginDto) => {
    try {
      let response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginDto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        localStorage.setItem("token", data.accessToken);
        dispatch(getProfile(data.username));
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  return (
    <>
      <li onClick={handleShow} className="nav-link list-unstyled">
        Login
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="mario.rossi"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="···············"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              login({
                username: username,
                password: password,
              });
              handleClose();
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    dispatch(setProfile(initialState.profile));
    navigate("/");
  };
  return (
    <li className="nav-link list-unstyled" onClick={logout}>
      Logout
    </li>
  );
}
