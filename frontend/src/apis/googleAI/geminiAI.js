import axios from "axios";
//Regestration 


//============Generate Content API========
export const GenerateContentAPI = async ({ prompt, heading }) => {

    const response = await axios.post(
        "http://localhost:8090/api/v1/openai/generate-content",
        {
            prompt,
            heading
        },
        {
            withCredentials: true,
        }
    );
    return response?.data;
}

export default GenerateContentAPI