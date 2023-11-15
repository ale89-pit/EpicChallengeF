import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../redux/store/index";
import { Profile } from "../redux/reducers/profile";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

import { Province } from "../interfaces/Province";
import { Municipality } from "../interfaces/Municipality";

import { updateProfileField } from "../redux/actions";
import { userDto } from "../interfaces/UserDto";
import { LibraryDto } from "../interfaces/LibraryDto";

const UserorLibraryDetails = () => {
  const currentProfile: Profile = useSelector(
    (state: RootState) => state.profile
  );
  const [userDto, setUserDto] = useState<userDto>({
    fullname: currentProfile.fullname ? currentProfile.fullname : "",
    name: currentProfile.name ? currentProfile.name : "",
    username: currentProfile.username ? currentProfile.username : "",
    email: currentProfile.email ? currentProfile.email : "",
    phone: currentProfile.phone ? currentProfile.phone : "",
    addressDto: {
      street:
        currentProfile.address != null ? currentProfile.address.street : "",
      streetNumber:
        currentProfile.address != null ? currentProfile.address.number : "",
      municipalityId:
        currentProfile.address != null
          ? currentProfile.address.municipality.id
          : "",
    },
  });

  const dispatch = useDispatch();
  const [province, setProvince] = useState([]);
  const [region, setRegion] = useState<string[]>([]);
  const [provinceFilter, setProvinceFilter] = useState<string[]>([]);
  const [municipality, setMunicipality] = useState<Municipality[]>([]);

  const [validated, setValidated] = useState<boolean>(false);

  const uriModify =
    currentProfile.roles[0]?.roleName === "ROLE_USER"
      ? "http://localhost:8080/user/"
      : "http://localhost:8080/library/";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const sendModify = async (userDto: userDto) => {
    var requestOptionsPut = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(userDto),
    };
    try {
      let response = await fetch(
        uriModify + currentProfile.id,
        requestOptionsPut
      );
      if (response.ok) {
        alert("Modifica effettuata con successo");
      }
    } catch {
      alert("Errore nella modifica");
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    sendModify(userDto);
    console.log(userDto);
  };

  const createRegion = () => {
    console.log(province);
    const uniqueRegionsSet = new Set<string>();

    province.forEach((element: Province) => {
      uniqueRegionsSet.add(element.region);
    });

    // Converti il set in un array
    const uniqueRegionsArray = Array.from(uniqueRegionsSet);

    setRegion(uniqueRegionsArray);
  };
  const getProvince = async () => {
    try {
      let response = await fetch(
        "http://localhost:8080/province/all",
        requestOptions
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setProvince(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const filterProvince = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    const filteredProvinces: Province[] = province.filter(
      (element: Province) => element.region === selectedRegion
    );
    const provinceNames: string[] = filteredProvinces.map(
      (element: Province) => element.name
    );
    setProvinceFilter(provinceNames);
  };

  const getMunicipality = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProvince = event.target.value;
    console.log(selectedProvince);
    try {
      let response = await fetch(
        `http://localhost:8080/municipality/${selectedProvince}`,
        requestOptions
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setMunicipality(data);
      }
    } catch (error) {}
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
  };

  useEffect(() => {
    getProvince();
    console.log(userDto);
  }, []);
  useEffect(() => {
    createRegion();
  }, [province]);

  return (
    <Container fluid>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          {currentProfile.fullname && (
            <Form.Group as={Col} md="4" controlId="validationFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue={currentProfile.fullname}
                //   value={userDto.fullname}
                onChange={(e) =>
                  setUserDto({ ...userDto, fullname: e.currentTarget.value })
                }
                name="fullname"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          )}

          {currentProfile.username && (
            <Form.Group
              as={Col}
              md="4"
              controlId="validationUsername"
              onChange={handleInputChange}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                defaultValue={currentProfile.username}
                onChange={(e) =>
                  setUserDto({ ...userDto, username: e.currentTarget.value })
                }
                name="username"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          )}
          {currentProfile.name && (
            <Form.Group
              as={Col}
              md="4"
              controlId="validationUsername"
              onChange={handleInputChange}
            >
              <Form.Label>Name Library</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                defaultValue={currentProfile.name}
                onChange={(e) =>
                  setUserDto({ ...userDto, name: e.currentTarget.value })
                }
                name="username"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group as={Col} md="4" controlId="validationEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">📧</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                defaultValue={currentProfile.email}
                onChange={(e) =>
                  setUserDto({ ...userDto, email: e.currentTarget.value })
                }
                name="email"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationPhone">
            <Form.Label>Phone </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">☎️</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Phone number "
                required
                aria-describedby="inputGroupPrepend"
                defaultValue={currentProfile.phone}
                onChange={(e) =>
                  setUserDto({ ...userDto, phone: e.currentTarget.value })
                }
                name="phone"
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationRegione">
            <Form.Label>Regione</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={filterProvince}
            >
              <option>
                {currentProfile.address != null
                  ? currentProfile.address.municipality.province.region
                  : ""}
              </option>
              {region.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationProvincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={getMunicipality}
            >
              <option>
                {currentProfile.address != null
                  ? currentProfile.address.municipality.province.name
                  : ""}
              </option>
              {provinceFilter.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationComune">
            <Form.Label>Comune</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) =>
                setUserDto({
                  ...userDto,
                  addressDto: {
                    ...userDto.addressDto,
                    municipalityId: e.currentTarget.value,
                  },
                })
              }
            >
              <option>
                {currentProfile.address != null
                  ? currentProfile.address.municipality.name
                  : ""}
              </option>
              {municipality.map((element, index) => {
                return (
                  <option key={index} value={element.id}>
                    {element.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationStreet">
            <Form.Label>Via,Piazza </Form.Label>
            <Form.Control
              type="text"
              placeholder="Via Roma"
              required
              defaultValue={
                currentProfile.address != null
                  ? currentProfile.address.street
                  : ""
              }
              onChange={(e) =>
                setUserDto({
                  ...userDto,
                  addressDto: {
                    ...userDto.addressDto,
                    street: e.currentTarget.value,
                  },
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid street.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationStreetNumber">
            <Form.Label>Numero Civico </Form.Label>
            <Form.Control
              type="string"
              placeholder="56"
              defaultValue={
                currentProfile.address != null
                  ? currentProfile.address.number
                  : ""
              }
              onChange={(e) =>
                setUserDto({
                  ...userDto,
                  addressDto: {
                    ...userDto.addressDto,
                    streetNumber: e.currentTarget.value,
                  },
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationZipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="text" placeholder="Zip" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationKm">
            <Form.Label>Km</Form.Label>
            <Form.Control type="text" placeholder="3400" />
            <Form.Control.Feedback type="invalid">
              Please provide a number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Interno 4, Scala A"
              rows={3}
            />
          </Form.Group>
        </Row>

        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default UserorLibraryDetails;
