{
  inputs = {
    gc-nix.url = "github:goodcover/gc-nix";
    flake-utils.follows = "gc-nix/flake-utils";
    nixpkgs.follows = "gc-nix/nixpkgs";
  };

  outputs = { self, gc-nix, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        inherit (nixpkgs) lib;

        shell = gc-nix.devShells.${system}.app;

        isLinux = lib.hasPrefix "x86_64-linux" system;

        inputs = shell.buildInputs ++ [
          pkgs.podman
          pkgs.curl
          pkgs.yq
          pkgs.nodejs
          pkgs.awscli
          pkgs.ed
          pkgs.pnpm
          pkgs.stdenv.cc.cc
          pkgs.zlib
          pkgs.icu
          pkgs.nss
          pkgs.openssl
        ];

      in
      {

        devShell = pkgs.mkShell {
          buildInputs = inputs;

#            __patchTarget="./sitev2/node_modules/workerd/bin/workerd"
#            if [[ -f "$__patchTarget" ]]; then
#              ${pkgs.patchelf}/bin/patchelf --set-interpreter ${pkgs.glibc}/lib/ld-linux-x86-64.so.2 "$__patchTarget"
#            fi
          shellHook = ''
            . ./dev/shell-hook.sh
            export PATH="$PATH:$(pwd)/node_modules/.bin:$(pwd)/sitev2/node_modules/.bin"
          '';

        };

        devShells = gc-nix.devShells;

        pkgs = pkgs;

        rocksdb = shell.rocksdb;
      }
    );
}
