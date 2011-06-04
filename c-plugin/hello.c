#include "hello.h"
#include "SDL.h"
#include "PDL.h"

PDL_bool hello(PDL_JSParameters *params)
{
  const char *name = NULL;
  if (PDL_GetNumJSParams(params) < 1 || !(name = PDL_GetJSParamString(params, 0))) {
    PDL_JSException(params, "You must send a name string");
    return PDL_TRUE;
  }
  
  char reply[MAXLINLEN];
  snprintf(reply, MAXLINLEN, "Hello %s!", name);
  PDL_JSReply(params, reply);
  
  return PDL_TRUE;
}

int main(int argc, char** argv)
{
  // Initialize the SDL library
  int result = SDL_Init(SDL_INIT_VIDEO);
    
  if ( result != 0 ) {
    printf("Could not init SDL: %s\n", SDL_GetError());
    exit(1);
  }

  PDL_Init(0);
    
  // register the js callback
  PDL_RegisterJSHandler("hello", hello);
  PDL_JSRegistrationComplete();
  PDL_CallJS("ready", NULL, 0);

  // Event descriptor
  SDL_Event Event;

  do {
    SDL_WaitEvent(&Event);
  } while (Event.type != SDL_QUIT);
  // We exit anytime we get a request to quit the app

  // Cleanup
  PDL_Quit();
  SDL_Quit();

  return 0;
}
