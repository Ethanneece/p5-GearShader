precision mediump float;

uniform vec2 u_resolution;
uniform float u_time; 

uniform float gearAmount; 

struct Gear
{
    float t;			// Time
    float gearR;		// Gear radius
    float teethH;		// Teeth height
    float teethR;		// Teeth "roundness"
    float teethCount;	// Teeth count
    float diskR;		// Inner or outer border radius
    vec3 color;			// Color
};

    
    
float GearFunction(vec2 uv, Gear g)
{
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    // Gear polar function:
    //  A sine squashed by a logistic function gives a convincing
    //  gear shape!
    float p = g.gearR-0.5*g.teethH + 
              g.teethH/(1.0+exp(g.teethR*sin(g.t + g.teethCount*a)));

    float gear = r - p;
    float disk = r - g.diskR;
    
    return g.gearR > g.diskR ? max(-disk, gear) : max(disk, -gear);
}

void main()
{

    // standardizing coordniate system. 
    vec2 st = 2.0*(gl_FragCoord.xy - 0.5 * u_resolution.xy)/u_resolution.y;
    vec3 color = vec3(0.0);
    float eps = 2.0/u_resolution.y;

    vec3 base = vec3(0.95, 0.7, 0.2);
    float change = 0.0; 
    float rotate = u_time * 10.0; 
    
    // Generating 3 gears for the shader. 
    for (float i = 0.0; i < 3.0; i++) {

        Gear g; 

	// Initialize spinning 
        if (gearAmount == 0.0) {
            g = Gear(rotate, .9-change, 0.10, 8.0, 16.0, 0.7-change, base);
        }
        else {
            g = Gear(rotate, .9-change, 0.10, 8.0, gearAmount, 0.7-change, base);
        }

        change += .25; 
        color += smoothstep(eps, -eps, GearFunction(st, g));
        rotate *= -1.0; 
    }

    gl_FragColor = vec4(color, 1.0);
}