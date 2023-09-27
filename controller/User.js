import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const database = [];

const ChatGPTFunction = async (text) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: text,
		temperature: 0.7,
		max_tokens: 250,
		top_p: 1,
		frequency_penalty: 1,
		presence_penalty: 1,
	});
	return response.data.choices[0].text;
};
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email,password,"from login side");
  
      const user = await User.findOne({ email, password });
   
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      console.log(token,"login data");
  
      res
        .status(200)
        .cookie("LoginData", token, {
          expires: new Date(Date.now() + 600000),
          httpOnly: false,
        })
        .json({
          success: true,
          message: token,
        });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const register = async (req, res) => {
    try {
      const { Email, Password , Name } = req.body;
 
      const user = await User.create({ email:Email, password:Password ,name:Name});
   
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Please check the field details",
        });
      }
  
     
  
      res
        .status(200)
      
        .json({
          success: true,
          message: "Registered In Successfully",
        });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const ProfileSummaryAiWriter=async(req,res)=>{
    try{
    const {job_title, tech_stack,currentExp,summary}=req.body;
  
	const prompt1 = `I am writing a resume, my details are \n role: ${job_title} (${currentExp} years). \n I write in the technolegies: ${tech_stack}. Can you write a 3 lines for description for the top of the resume and use this default description ${summary} for writing the best summary (first person writing)?`;
    const objective = await ChatGPTFunction(prompt1);
    if(!objective)
    {
        return res.status(400).json({
            success: false,
            message: "Please check the field details",
          });  
    }
    
    res
        .status(200)
      
        .json({
          success: true,
          message: objective,
        });
  }

catch(error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        }); 
}
  }

  export const WorkSummary=async(req,res)=>{
    try{
    const {job_title, tech_stack,Employer,Start_date,End_date}=req.body;
   
    const prompt2 = `I am writing a resume, my details are \n Current company:${Employer} \n role: ${job_title} (Job start date from ${Start_date} to ${End_date}). \n I write in the technolegies: ${tech_stack}. Can you write 4 points for a resume on what I am good at?`;
    const WorkSummary = await ChatGPTFunction(prompt2);
    if(!WorkSummary)
    {
        return res.status(400).json({
            success: false,
            message: "Please check the field details",
          });  
    }
    res
        .status(200)
      
        .json({
          success: true,
          message: WorkSummary,
        });
  }

catch(error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        }); 
}
  }

  export const GetUserData=async(req,res)=>{
    try {
       const {email}=req.body;
   
       const user = await User.findOne({ email }).select('-password');
     
    
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Please check the field details",
          });
        }
    
       
    
        res
          .status(200)
        
          .json({
            success: true,
            message: user,
          });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
  }