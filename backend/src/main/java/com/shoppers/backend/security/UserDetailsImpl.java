package com.shoppers.backend.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppers.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserDetailsImpl implements UserDetails, OAuth2User {
  private static final long serialVersionUID = 1L;

  @EqualsAndHashCode.Include
  private Long id;
  private String username;
  private String email;
  @JsonIgnore
  private String password;
  private String name;

  private Collection<? extends GrantedAuthority> authorities;
  private Map<String, Object> attributes;

  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetailsImpl(
        user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getPassword(),
        user.getName(),
        authorities,
        new HashMap<>());
  }

  public static UserDetailsImpl build(User user, Map<String, Object> attributes) {
    UserDetailsImpl userDetails = UserDetailsImpl.build(user);
    userDetails.setAttributes(attributes);
    return userDetails;
  }

  @Override
  public Map<String, Object> getAttributes() {
    return attributes;
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
