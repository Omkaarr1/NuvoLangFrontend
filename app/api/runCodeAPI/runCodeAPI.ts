import axios from 'axios';

export async function runCodeAPI(code: string) {
  try {
    const response = await axios.post(
      'https://nuvolang.onrender.com/runCode',
      { code },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Axios automatically parses JSON responses
    return response.data;
  } catch (error) {
    // Axios errors have a different structure
    if (axios.isAxiosError(error)) {
      console.error('Error executing code:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
