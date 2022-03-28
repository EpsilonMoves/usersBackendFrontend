import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Button } from '@mui/material';
import ActionsCell from './actionsCell';
import { selectUsers, setReducerUsers } from '../../store/users-slice';
import { useDispatch, useSelector } from 'react-redux';


export default function UsersTable(){
  

 
    const usersFromSlicer =  useSelector(selectUsers)



  const columns = [
    { field: 'firstName', headerName: 'First name', width: 200  },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'dateStarted',
      headerName: 'Date Started',
      type: 'Date',
      width: 200,
    },
    { field: 'position', headerName: 'Position', width: 200 },
    { field: 'salary', headerName: 'Salary', width: 200 },
    { field: 'managerName', headerName: 'Manager Name', width: 200 }, 
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
      
           return (
          <div>
            <ActionsCell userData={params.row}/>
          </div>
        )
      }
    },
  ];


    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
            rows={usersFromSlicer}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            options={{
              selectableRowsHeader: false,
              selectableRowsHideCheckboxes: true,
              customToolbar: () => (<Button >asd</Button>),
            }}
            />
        </div>
    )
}