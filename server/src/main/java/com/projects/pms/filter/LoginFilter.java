package com.projects.pms.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.pms.request.JwtRequest;
import com.projects.pms.response.JWTResponse;
import com.projects.pms.services.EmployeeService;
import com.projects.pms.util.JwtUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class LoginFilter extends AbstractAuthenticationProcessingFilter {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;


    private final RequestMatcher loginRequestMatcher = new AntPathRequestMatcher("/login",
            HttpMethod.POST.toString());

    public LoginFilter(String string) {
        super(string);
    }

    @Override
    public Authentication attemptAuthentication( HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException {

        Authentication auth = null;

        System.out.println("attemptAuthentication");



        if(isLoginRequest(request)){
            try {
                JwtRequest creds = new ObjectMapper().readValue(request.getInputStream(), JwtRequest.class);
                System.out.println("password: "+ creds.getPassword());

                UserDetails userDetails = employeeService.loadUserByUsername(creds.getEmail());
                System.out.println("loaded user");
                Authentication authentication = employeeService.authenticate(creds.getEmail(),creds.getPassword());
                if((!userDetails.getUsername().isEmpty()) && authentication != null){
                    final String jwt = jwtUtil.generateToken(userDetails);
                    Cookie cookie = new Cookie("EmpJwt", jwt);
                    System.out.println("JWt created...");
                    cookie.setPath("/");

                    cookie.setMaxAge(3600*24);

                    response.addCookie(cookie);
                    auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    return auth;
                }
                throw new Exception("Invalid Password");

            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

        }
        return  new UsernamePasswordAuthenticationToken(null, null, null);

    }
    @Override
    protected boolean requiresAuthentication(HttpServletRequest request, HttpServletResponse response) {
        return super.requiresAuthentication(request, response) && isLoginRequest(request)  ;
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        if (authResult != null) {
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authResult);
            SecurityContextHolder.setContext(context);


            String token = jwtUtil.generateToken((UserDetails) authResult.getPrincipal());
            
            JWTResponse jwtResponse = new JWTResponse(token);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(jwtResponse);
            response.setContentType("application/json");
            response.getWriter().write(jsonResponse);

            Cookie springCookie = new Cookie("Jwt", token);
            springCookie.setPath("/");
            springCookie.setMaxAge(24*3600*3600);

            springCookie.isHttpOnly();
            response.addCookie(springCookie);

        }

    }

    private boolean isLoginRequest(HttpServletRequest request) {
        return loginRequestMatcher.matches(request);
    }

}
