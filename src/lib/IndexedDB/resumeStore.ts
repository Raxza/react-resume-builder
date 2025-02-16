import { addData, getAllData, getDataById, updateData, deleteData, Stores } from "./db"
import { Resume } from "../../types/Resume";
import { DBResponse } from "../../types/DBResponse";

export const handleAddResume = async (resume: Resume): Promise<DBResponse<Resume>> => {
  try {
    const res = await addData(Stores.Resume, resume);
    if (res.status === 'success') {
      console.log('Resume added successfully', res.data);
    } else {
      console.error('Error adding resume', res.data);
    }
    return res;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 'error', data: error.message };
    } else {
      return { status: 'error', data: 'Unknown error' };
    }
  }
}

export const handleGetAllResumes = async (): Promise<Resume[]> => {
  try {
    const res = await getAllData<Resume>(Stores.Resume);
    if (res.status === 'success') {
      return res.data as Resume[] || [];
    } else {
      console.error('Error fetching resumes');
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const handleGetResumeById = async (id: number): Promise<Resume|null> => {
  try {
    const res = await getDataById<Resume>(Stores.Resume, id);
    if (res.status === 'success') {
      return res.data as Resume || null;
    } else {
      console.error('Error fetching resume');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const handleUpdateResume = async (resume: Resume): Promise<DBResponse<Resume>> => {
  try {
    const res = await updateData(Stores.Resume, resume);
    if (res.status === 'success') {
      console.log('Resume updated successfully', res.data);
    } else {
      console.error('Error updating resume', res.data);
    }
    return res;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 'error', data: error.message };
    } else {
      return { status: 'error', data: 'Unknown error' };
    }
  }
}

export const handleDeleteResume = async (id: number): Promise<DBResponse<null>> => {
  try {
    const res = await deleteData(Stores.Resume, id);
    if (res.status === 'success') {
      console.log('Resume deleted successfully');
    } else {
      console.error('Error deleting resume');
    }
    return res;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 'error', data: error.message };
    } else {
      return { status: 'error', data: 'Unknown error' };
    }
  }
}
