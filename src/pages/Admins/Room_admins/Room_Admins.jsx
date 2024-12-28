// @ts-nocheck
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import Button from "../../../Ui/Button";
import { useState } from "react";
import AddButton from "../../../components/Add Button/AddButton";
import TitlePage from "../../../components/Title page/TitlePage";
import { useDispatch } from "react-redux";
import { Useget_roomadmins } from "../../../hooks/HAdmins/Room_admins/Useget_roomadmins";
import { fetchroomAdmins } from "../../../app/features/admins/Getroomslice";
import DelRoomadmin from "./Del_Roomadmins/DelRoomadmins";
import EditRoomadmin from "./Edit_Roomadmins/EditRoomadmins";
import AddRoomadmin from "./Add_Roomadmin/AddRoomadmins";
import Loading_spin from "../../../Ui/Loading_spin";

const RoomAdmins = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [roomAdmins, setroomAdmins] = useState({
    id: 0,
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const closeModalEdit = () => setIsOpenEdit(false);
  const openModalEdit = (labadmin) => {
    setIsOpenEdit(true);
    setroomAdmins(labadmin);
  };
  const [isOpenDel, setIsOpenDel] = useState(false);
  const closeModalDel = () => setIsOpenDel(false);
  const openModalDel = (nurse) => {
    setIsOpenDel(true);
    setroomAdmins(nurse);
  };
  const { data, isLoading } = Useget_roomadmins();
  dispatch(fetchroomAdmins(data));
  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading_spin />
      </div>
    );
  return (
    <Box sx={{ height: 600, width: "98%", mx: "auto" }}>
      <TitlePage path={"Dashbord / Admins / "} page={"Room Admins"} />
      <AddButton add={openModal} title={"Add New Admin"} />
      {data && data.length > 0 ? (
        <DataGrid
          rows={data.map((row) => ({
            id: row.id,
            name: row.name,
            phone: row.phone,
            email: row.email,
            static_role: row.static_role,
            address: row.address,
            edit: "Edit",
            delete: "Delete",
          }))}
          columns={Object.keys(data[0])
            .map((key) => {
              const isEditOrDeleteColumn = key === "edit" || key === "delete";
              if (isEditOrDeleteColumn) {
                return null;
              }
              return {
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1),
                width: 150,
                flex: 1,
                align: "center",
                headerAlign: "center",
              };
            })
            .filter(Boolean)

            .concat([
              {
                field: "edit",
                headerName: "Edit",
                width: 150,
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: (params) => (
                  <Button
                    onClick={() => openModalEdit(params.row)}
                    styles="bg-[#3D5045] text-[#71dd37]"
                  >
                    Edit
                  </Button>
                ),
              },
              {
                field: "delete",
                headerName: "Delete",
                width: 150,
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: (params) => (
                  <Button
                    onClick={() => openModalDel(params.row)}
                    styles="bg-[#543641] text-[#ff3e1d]"
                  >
                    Delete
                  </Button>
                ),
              },
            ])}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      ) : (
        <p>No data available</p>
      )}
      <AddRoomadmin
        isOpen={isOpen}
        closeModal={closeModal}
        title={"Add New Admins "}
      />
      <EditRoomadmin
        isOpenEdit={isOpenEdit}
        closeModalEdit={closeModalEdit}
        title={"Edit Admin Information"}
        roomAdmin={roomAdmins}
      />
      <DelRoomadmin
        isOpen={isOpenDel}
        closeModal={closeModalDel}
        roomAdmin={roomAdmins}
      />
    </Box>
  );
};

export default RoomAdmins;