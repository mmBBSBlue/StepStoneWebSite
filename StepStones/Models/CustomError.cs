using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepStones.Models
{
    public class CustomError
    {
        public UInt64 Code { get; private set; }
        public string Text { get; private set; }

        private string header;
        private string body;

        public CustomError(Exception ex, UInt64 code)
        {
            this.Code = code;
            _getText(ex.Message);
        }

        private void _getText(string rawMessage)
        {
            switch (this.Code)
            {
                case 400:
                    this.header = "Bad Request";
                    this.body = "Die Anfrage war fehlerhaft.";
                    ; break;
                case 401:
                    this.header = "Unauthorized";
                    this.body = "Sie sind nicht berechtigt die angeforderte Ressource zu empfangen.";
                    ; break;
                case 402:
                    this.header = "Payment Required";
                    this.body = "Sie müssen die angeforderte Ressource bezahlen, bevor Sie die Ressource verwenden dürfen.";
                    ; break;
                case 403:
                    this.header = "Forbidden";
                    this.body = "Sie sind nicht berechtigt die angeforderte Ressource zu betrachten.";
                    ; break;
                case 404:
                    this.header = "Not Found";
                    this.body = "Die angeforderte Ressource wurde nicht gefunden.";
                    ; break;
                case 405: break;
                case 406: break;
                case 407: break;
                case 408: break;
                case 409: break;
                case 410: break;
                case 411: break;
                case 412: break;
                case 413: break;
                case 414: break;
                case 415: break;
                case 416: break;
                case 417: break;
                case 420: break;
                case 421: break;
                case 422: break;
                case 423: break;
                case 424: break;
                case 426: break;
                case 428: break;
                case 429: break;
                case 431: break;
                case 451:break;

                default:
                    this.Code = 418;
                    this.body = "I’m a teapot";
                    break;
            }
        }
    }
}
