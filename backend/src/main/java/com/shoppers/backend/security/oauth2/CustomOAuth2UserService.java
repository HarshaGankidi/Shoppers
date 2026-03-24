package com.shoppers.backend.security.oauth2;

import com.shoppers.backend.model.ERole;
import com.shoppers.backend.model.Role;
import com.shoppers.backend.model.User;
import com.shoppers.backend.repository.RoleRepository;
import com.shoppers.backend.repository.UserRepository;
import com.shoppers.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    return processOAuth2User(userRequest, oAuth2User);
  }

  private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
    Map<String, Object> attributes = oAuth2User.getAttributes();
    String email = (String) attributes.get("email");
    String name = (String) attributes.get("name");
    String sub = (String) attributes.get("sub"); // Google's unique user ID

    Optional<User> userOptional = userRepository.findByEmail(email);
    User user;
    if (userOptional.isPresent()) {
      user = userOptional.get();
    } else {
      user = new User();
      user.setEmail(email);
      user.setName(name);
      user.setUsername(email.split("@")[0] + "_" + sub.substring(0, 5));
      user.setPassword(""); // OAuth2 users don't have a local password

      Set<Role> roles = new HashSet<>();
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
      user.setRoles(roles);
      userRepository.save(user);
    }

    return UserDetailsImpl.build(user);
  }
}
