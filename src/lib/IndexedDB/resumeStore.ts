import { addData, getAllData, getDataById, updateData, deleteData, Stores, getVersionsByResumeId } from "./db"
import { Resume, ResumeVersion, ResumeWithVersions } from "../../types/Resume";
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
    // First get the current resume to create a version
    const current = await handleGetResumeById(resume.id!);
    if (!current) {
      return { status: 'error', data: 'Resume not found' };
    }

    // Create a new version from the current resume
    const versionData = {
      resumeId: resume.id!,
      version: (current as ResumeWithVersions).currentVersion || 0,
      changes: 'Updated resume',
      data: current,
      createdAt: Date.now()
    };
    
    await addData(Stores.ResumeVersion, versionData);

    // Update the resume with new version number
    const updatedResume = {
      ...resume,
      currentVersion: ((current as ResumeWithVersions).currentVersion || 0) + 1
    };

    const res = await updateData(Stores.Resume, updatedResume);
    return res;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 'error', data: error.message };
    }
    return { status: 'error', data: 'Unknown error' };
  }
};

const handleDeleteResumeVersions = async (resumeId: number): Promise<DBResponse<null>> => {
  try {
    const versions = await getResumeVersions(resumeId);
    const deletePromises = versions.map(version => 
      deleteData(Stores.ResumeVersion, version.id!)
    );
    await Promise.all(deletePromises);
    return { status: 'success', data: null };
  } catch (error) {
    console.error('Error deleting resume versions:', error);
    return { status: 'error', data: null };
  }
};

export const handleDeleteResume = async (id: number): Promise<DBResponse<null>> => {
  try {
    // First delete all versions
    await handleDeleteResumeVersions(id);
    // Then delete the resume itself
    const res = await deleteData(Stores.Resume, id);
    return res;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 'error', data: error.message };
    }
    return { status: 'error', data: 'Unknown error' };
  }
};

export const getResumeVersions = async (resumeId: number): Promise<ResumeVersion[]> => {
  try {
    const res = await getVersionsByResumeId<ResumeVersion>(resumeId);
    if (res.status === 'success' && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
