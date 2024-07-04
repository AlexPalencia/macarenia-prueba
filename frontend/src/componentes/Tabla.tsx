/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { DataGrid, GridColDef, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, ModeEditOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';

const Tabla = ({
    rows,
    handleEdit,
    handleDelete
}: {
    handleEdit: (id: number) => void,
    handleDelete: (id: number) => void
    rows: any
}) => {

  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 100 },
    { 
      field: 'tipo_documento', 
      headerName: 'Tipo de Documento', 
      width: 200,
      renderCell: (params) => {
        // let chipColor, chipText;
        let text;
        switch (params.row.tipo_documento) {
            case 1:
              text = 'Cédula de ciudadanía'
              break;
            case 2:
              text = 'Registro civil';
              break;
            case 3:
              text = 'NUIP';
              break;
            case 4:
              text = 'Pasaporte';
              break;
            case 5:
              text = 'Permiso especial de permanenci';
              break;
            case 6:
              text = 'Cédula extranjera';
              break;
            case 7:
              text = 'Tarjeta de indentidad';
              break;
            default:
              text = '';
              break;
        }

        return (
            // <Chip
            //     label={chipText}
            //     color={chipColor}
            //     variant="outlined"
            // />
            <Typography>{text}</Typography>
        );
      },
    },
    { field: 'numero_documento', headerName: 'Tipo de Documento', width: 200 },
    { field: 'primer_nombre', headerName: 'Primer Nombre', width: 200 },
    { field: 'primer_apellido', headerName: 'Primer Apellido', width: 200 },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'Acciones',
      width: 200,
      getActions: (params: GridRowParams) => [
        <>
            <GridActionsCellItem key={params.id} icon={<ModeEditOutline />} onClick={() => handleEdit(params.id as number)} label="Editar" />
            <GridActionsCellItem key={params.id} icon={<Delete />} onClick={() => handleDelete(params.id as number)} label="Eliminar" />
        </>
      ],
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default Tabla;
