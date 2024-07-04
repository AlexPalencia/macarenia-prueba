/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api_base = 'http://localhost:8000/';

const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(`${api_base}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const postData = async (url: string, data: any): Promise<any> => {
  try {
    const response = await axios.post(`${api_base}${url}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const editData = async (url: string, data: any): Promise<any> => {
  try {
    const response = await axios.put(`${api_base}${url}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing data:", error);
    throw error;
  }
};

const deleteData = async (url: string): Promise<any> => {
  try {
    const response = await axios.delete(`${api_base}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export { fetchData, postData, editData, deleteData };
