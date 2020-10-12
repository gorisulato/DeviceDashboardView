using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class TranslateMessageClass
    {
        public static string TranslateMessage(string action, string data)
        {
            string msg = "";

            switch (action)
            {
                case "Insert":
                    msg = data + " " + Resources.Resource.MessageDeleteSuccess;
                    break;
                case "Update":
                    msg = data + " " + Resources.Resource.MessageUpdateSuccess;
                    break;
                case "Delete":
                    msg = data + " " + Resources.Resource.MessageDeleteSuccess;
                    break;
                case "Duplicate":
                    msg = data + " " + Resources.Resource.MessageDuplicateSuccess;
                    break;
                case "Move":
                    msg = data + " " + Resources.Resource.MessageMoveSuccess;
                    break;
                case "Lock":
                    msg = data + " " + Resources.Resource.MessageLockSuccess;
                    break;
                case "Unlock":
                    msg = data + " " + Resources.Resource.MessageUnlockSuccess;
                    break;
                case "ResetPassword":
                    msg = data + " " + Resources.Resource.MessageResetPasswordSuccess;
                    break;
            }
            return msg;
        }

        public static string TranslateMessage(string action, string PreMessage, string data)
        {
            string msg = "";

            switch (action)
            {
                case "Insert":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageInsertSuccess;
                    break;
                case "Update":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageUpdateSuccess;
                    break;
                case "Delete":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageDeleteSuccess;
                    break;
                case "Duplicate":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageDuplicateSuccess;
                    break;
                case "Move":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageMoveSuccess;
                    break;
                case "Lock":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageLockSuccess;
                    break;
                case "Unlock":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageUnlockSuccess;
                    break;
                case "ResetPassword":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageResetPasswordSuccess;
                    break;
                case "DuplicateViolation":
                    msg = PreMessage + " " + data + " " + Resources.Resource.MessageDuplicateViolation;
                    break;
            }
            return msg;
        }

        public static string TranslateMessage(string action)
        {
            string msg = "";

            switch (action)
            {
                case "LoginFailed":
                    msg = Resources.Resource.MessageLoginFailed;
                    break;
                case "UserLocked":
                    msg = Resources.Resource.MessageUserLocked;
                    break;
                case "SentEmail":
                    msg = Resources.Resource.MessageEmailSentSuccess;
                    break;
                case "Success":
                    msg = Resources.Resource.MessageEmailSentSuccess;
                    break;

                case "unavailable":
                    msg = Resources.Resource.LabelEmailNotFound;
                    break;
                case "RetrieveSuccess":
                    msg = Resources.Resource.LabelRetrieveEmailSuccess;
                    break;

                case "Server did":
                    msg = Resources.Resource.LabelServerDid;
                    break;
                case "Server not found":
                    msg = Resources.Resource.LabelServerNotFound;
                    break;
                case "Server is not available":
                    msg = Resources.Resource.LabelServerIsNotAvaiable;
                    break;
            }
            return msg;
        }
    }
}