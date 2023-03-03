import nodemailer from 'nodemailer';

function send_mail(to_mail,mail_subject, mail_body){
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
          user: "sakibalhasandu123@gmail.com",
          pass: "ffkjpmhtroqslqxh"
        }
      })
      
      let details = {
        from: "sakibalhasandu123@gmail.com",
        to: to_mail,
        subject: mail_subject,
        text: mail_body
      }
  
       mailTransporter.sendMail(details,(err)=>{
        if(err){
          console.log("there are an error to send mail")
          console.log(err)
        }
        else{
          console.log("Email send successfully");
        }
      })
  
  
}

export default send_mail