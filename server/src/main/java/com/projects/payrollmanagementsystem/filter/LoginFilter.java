package com.projects.payrollmanagementsystem.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.payrollmanagementsystem.request.JwtRequest;
import com.projects.payrollmanagementsystem.response.JWTResponse;
import com.projects.payrollmanagementsystem.services.EmployeeService;
import com.projects.payrollmanagementsystem.services.JwtService;
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
    JwtService jwtService;


    private final RequestMatcher loginRequestMatcher = new AntPathRequestMatcher("/login",
            HttpMethod.POST.toString());

    public LoginFilter(String string) {
        super(string);
    }

    @Override
    public Authentication attemptAuthentication( HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException {

        Authentication auth = null;

        log.info("attemptAuthentication");



        if(isLoginRequest(request)){
            try {
                JwtRequest creds = new ObjectMapper().readValue(request.getInputStream(), JwtRequest.class);
                log.info("password: "+ creds.getPassword());

                UserDetails userDetails = employeeService.loadUserByUsername(creds.getEmail());
                log.info("loaded user");
                Authentication authentication = employeeService.authenticate(creds.getEmail(),creds.getPassword());
                if((!userDetails.getUsername().isEmpty()) && authentication != null){
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
            String token = jwtService.generateToken((UserDetails) authResult.getPrincipal());
            JWTResponse jwtResponse = new JWTResponse(token);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(jwtResponse);
            response.setContentType("application/json");
            response.getWriter().write(jsonResponse);
            Cookie cookie = new Cookie("X-AUTH", token);
            cookie.setPath("/");
            cookie.setMaxAge(24*3600*3600);
            cookie.isHttpOnly();
            response.addCookie(cookie);

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authResult);
            SecurityContextHolder.setContext(context);


        }

    }

    private boolean isLoginRequest(HttpServletRequest request) {
        return loginRequestMatcher.matches(request);
    }

}
