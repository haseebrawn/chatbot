import { useState, useEffect } from "react";
import MyVerticallyCenteredModal from "./Modal";
import { Container } from "@mui/material";
import axios from "axios";
import {
  CTableRow,
  CButton,
  CCardHeader,
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
} from "@coreui/react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "./CustomPagination";
import Button from "./Button";
import CustomizableField from "../Components/CustomizableField";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrders, setSortOrders] = useState({
    username: null,
    email: null,
    date: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // date for state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // valid date range select useeffect
  useEffect(() => {
    let isDateRangeValid = false;
    let dateA = new Date(startDate);
    let dateB = new Date(endDate);
    if (dateA < dateB) {
      isDateRangeValid = true;
    }
    if (!isDateRangeValid) {
      // alert('Selected Range is invalid');
      setEndDate("");
    }
  }, [startDate, endDate]);

  // fetch users from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:10000/api/users");
        const userData = response.data;
        const sortedUsers = userData.sort((a, b) =>
          a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        );
        setUsers([...sortedUsers]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // filtered users by searchQuery
  useEffect(() => {
    // Update filteredUsers whenever users or searchQuery changes
    const filteredData = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers([...filteredData]);
    setCurrentPage(1);
  }, [users, searchQuery]);

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
  };

  const handleFilterByDateRange = () => {
    let formattedStartDate;
    let formattedEndDate;
    if (startDate) {
      formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    }
    if (endDate) {
      formattedEndDate = new Date(endDate).toISOString().split("T")[0];
    }

    // Validate that end date is greater than or equal to start date
    if (formattedEndDate < formattedStartDate) {
      console.log("End date should be greater than or equal to start date");
      return;
    }

    // Filter users based on the date range
    const usersInDateRange = users.filter((user) => {
      const userDate = user.date.split("T")[0];

      return userDate >= formattedStartDate && userDate <= formattedEndDate;
    });
    setStartDate("");
    setEndDate("");
    setUsers(usersInDateRange);
  };

  const toggleSortOrder = (field) => {
    setSortOrders((prevSortOrders) => ({
      ...prevSortOrders,
      [field]: prevSortOrders[field] === "asc" ? "desc" : "asc",
    }));
  };

  const sortData = (field) => {
    const sortOrder = sortOrders[field];
    return [...filteredUsers].sort((a, b) => {
      const valueA = a[field].toLowerCase();
      const valueB = b[field].toLowerCase();
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  };

  const handleSort = (field) => {
    toggleSortOrder(field);
    setFilteredUsers(sortData(field));
    setCurrentPage(1);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(
        `http://localhost:10000/api/search?query=${query}`
      );
      const searchData = response.data;
      setUsers(searchData);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  const getUsersForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <CRow className="mtl-5">
        <CCol xs={12} md={12} lg={12}>
          <CRow className="ptpb-20 date-range">
            <CCol lg={2}></CCol>
            <CCol className="txt-right" xs={6} lg={3}>
              <div className="txt-right">
                <CustomizableField
                  inputType="date"
                  inputValue={startDate}
                  inputPlaceholder=""
                  onChangeEvent={handleStartDateChange}
                  minDate={startDate}
                />
              </div>
            </CCol>
            <CCol xs={6} lg={3}>
              <div>
                <CustomizableField
                  inputValue={endDate}
                  inputType="date"
                  inputPlaceholder=""
                  onChangeEvent={handleEndDateChange}
                />
              </div>
            </CCol>
            <CCol xs={2} lg={2} className="txt-right justify-content-lg-start mt-3 mt-lg-0">
              <Button
                clickHandler={handleFilterByDateRange}
                stylingClass="btnDateSelect"
                title="Search"
              />
            </CCol>
            <CCol lg={2}></CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mtl-5">
        <CCol xs={12} md={12} lg={12}>
          <CCard className="mb-4">
            <CCardHeader className="AdminPage_Header">
              <strong>Admin Panel</strong>
              <CustomizableField
                inputType="text"
                inputValue={searchQuery}
                onChangeEvent={handleSearch}
                inputPlaceholder="Search users..."
              />
            </CCardHeader>
            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell
                   scope="row"
                    onClick={() => handleSort("username")}
                  >
                    Name <FontAwesomeIcon icon={faSort} />
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="row"
                    onClick={() => handleSort("email")}
                  >
                    Email <FontAwesomeIcon icon={faSort} />
                  </CTableHeaderCell>
                  <CTableHeaderCell
                 scope="row"
                    onClick={() => handleSort("date")}
                  >
                    Date <FontAwesomeIcon icon={faSort} />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="row">Conversation</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {getUsersForCurrentPage().map((user, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{user.username}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                      {new Date(user.date).toLocaleDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        type="submit"
                        className="btnAdmin"
                        onClick={() => {
                          setModalShow(true);
                          setSelectedUser(user._id);
                        }}
                      >
                        View
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="custom_pagination">
              <CustomPagination
                pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </CCard>
        </CCol>
      </CRow>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user_id={selectedUser}
      />
    </Container>
  );
};

export default AdminPage;
