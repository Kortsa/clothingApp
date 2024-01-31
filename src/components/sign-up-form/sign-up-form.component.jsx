import { useState } from "react";

import { 
    createAuthUserWithEmailAndPassword, createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email:"",
    password:"",
    confirmPassord:""
};

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    const {displayName, email, password, confirmPassord} = formFields;

    const resetFormFileds = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (password !== confirmPassord){
            alert("Passwords do not match");
            return;
        }

        try {
            const {user} = await  createAuthUserWithEmailAndPassword(
                email,
                password
                );
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFileds()

        }catch(error){
            if (error.code === 'auth/email-already-in-use'){
                alert("Cannot create user, email already in use")
            } else{
                console.log(`user creation encountered an error`, error);
            }
          
        }
    };
    
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields ({...formFields, [name]: value})
    }; 
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput
                label = "Display Name"
                type="text" 
                onChange={handleChange} 
                required
                name="displayName"
                value={displayName}
                />

                
                <FormInput 
                label = "Email"
                type="email"
                 onChange={handleChange} 
                 required 
                 name="email"
                 value={email}
                 />

                
                <FormInput 
                label = "Password"
                type="password"
                onChange={handleChange} 
                required
                name="password"
                value={password}
                />

                
                <FormInput 
                label = "Confirm Password"
                type="password"
                onChange={handleChange} 
                required
                name="confirmPassord"
                value={confirmPassord}
                />
                <Button  type="submit">Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;